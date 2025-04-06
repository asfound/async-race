import type { CarService } from '~/app/services/car/car-service';
import type { CarItemProperties } from '~/app/types/interfaces';

import { HTTP_STATUS } from '~/app/constants/constants';
import { apiService } from '~/app/services/api/api-service';
import { EngineError } from '~/app/utils/custom-errors';
import { showErrorModal } from '~/app/utils/show-modal';

import type { CarAnimationController } from './animation-controller';

import { CarStatus, type CarStore } from '../car-store/car-store';

export class CarItemController {
  public readonly id: number;

  public readonly properties: CarItemProperties;

  private readonly item: HTMLLIElement;

  private readonly carService: CarService;

  private readonly animationController: CarAnimationController;

  private readonly carStore: CarStore;

  constructor(
    properties: CarItemProperties,
    item: HTMLLIElement,
    carService: CarService,
    animationController: CarAnimationController,
    carStore: CarStore
  ) {
    this.properties = properties;
    this.id = properties.id;
    this.item = item;
    this.carService = carService;
    this.animationController = animationController;
    this.carStore = carStore;
  }

  public removeCar(): void {
    this.carService
      .removeCar(this.id)
      .catch(showErrorModal)
      .finally(() => {
        this.item.remove();
      });
  }

  public returnCar(): void {
    this.animationController.stop();
    this.carStore.setStatus(CarStatus.ON_START);

    this.carService.returnCar(this.id).catch(showErrorModal);
  }

  public startCar(isRacing: boolean): Promise<void> {
    if (isRacing) {
      this.carStore.setStatus(CarStatus.RACING);
    }
    return apiService
      .startCar(this.id)
      .then((response) => {
        const { velocity, distance } = response;
        return distance / velocity;
      })
      .then((duration) => {
        this.animationController.drive(duration);
        return apiService.driveCar(this.id);
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
        } else {
          if (!isRacing) {
            showErrorModal(error);
          }
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
