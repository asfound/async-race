import type { CarService } from '~/app/services/car/car-service';
import type {
  CarItemProperties,
  CarStore,
  Store,
} from '~/app/types/interfaces';

import { HTTP_STATUS } from '~/app/constants/constants';
import { apiService } from '~/app/services/api/api-service';
import { CarStatus, GarageStatus } from '~/app/types/enums';
import { EngineError } from '~/app/utils/custom-errors';
import { showErrorModal } from '~/app/utils/show-modal';

import type { CarAnimationController } from './animation-controller';

export class CarItemController {
  public readonly id: number;

  public readonly properties: CarItemProperties;

  private readonly item: HTMLLIElement;

  private readonly carService: CarService;

  private readonly animationController: CarAnimationController;

  private readonly carStore: CarStore;

  private abortController: AbortController;

  private readonly store: Store;

  constructor(
    properties: CarItemProperties,
    item: HTMLLIElement,
    carService: CarService,
    animationController: CarAnimationController,
    carStore: CarStore,
    store: Store
  ) {
    this.properties = properties;
    this.id = properties.id;
    this.item = item;
    this.carService = carService;
    this.animationController = animationController;
    this.carStore = carStore;
    this.abortController = new AbortController();
    this.store = store;
  }

  public removeCar(): void {
    this.carService
      .removeCar(this.id)
      .catch(showErrorModal)
      .finally(() => {
        this.item.remove();
      });
  }

  public returnCar(): Promise<void> {
    this.abortController.abort();
    return this.carService.returnCar(this.id).then(() => {
      this.animationController.stop();
      this.carStore.setStatus(CarStatus.ON_START);
    });
  }

  public startCar(isRacing: boolean): Promise<void> {
    if (isRacing) {
      this.carStore.setStatus(CarStatus.RACING);
    } else {
      this.store.updateGarageStatus(GarageStatus.CARS_LEFT);
    }
    return apiService
      .startCar(this.id)
      .then((response) => {
        const { velocity, distance } = response;
        return distance / velocity;
      })
      .then((duration) => {
        this.animationController.drive(duration);
        if (!isRacing) {
          this.carStore.setStatus(CarStatus.DRIVING);
        }
        this.abortController = new AbortController();

        return apiService.driveCar(this.id, this.abortController.signal);
      })
      .then(() => {
        this.carStore.setStatus(CarStatus.FINISHED);
      })
      .catch((error: unknown) => {
        if (
          error instanceof EngineError &&
          error.statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ) {
          this.animationController.pause();

          this.carStore.setStatus(CarStatus.ENGINE_BROKEN);

          if (isRacing) {
            throw error;
          }
        } else if (!isRacing && !(error instanceof DOMException)) {
          showErrorModal(error);
        } else {
          throw error;
        }
      });
  }

  public updateCar(newName: string, newColor: string): void {
    this.carService
      .editCar(this.id, newName, newColor)
      .then(() => {
        this.carStore.editCar(newName, newColor);
      })
      .catch(showErrorModal);
  }
}
