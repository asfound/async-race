import type { CarService } from '~/app/services/car/car-service';

import { HTTP_STATUS } from '~/app/constants/constants';
import { apiService } from '~/app/services/api/api-service';
import { EngineError } from '~/app/utils/custom-errors';
import { showErrorModal } from '~/app/utils/show-error-modal';

import type { CarAnimationController } from './animation-controller';

export interface CarItemActions {
  showAlert: () => void;
  hideAlert: () => void;
}

export class CarItemController {
  private readonly id: number;

  private readonly item: HTMLLIElement;

  private readonly carService: CarService;

  private readonly animationController: CarAnimationController;

  private readonly actions: CarItemActions;

  constructor(
    id: number,
    item: HTMLLIElement,
    carService: CarService,
    animationController: CarAnimationController,
    actions: CarItemActions
  ) {
    this.id = id;
    this.item = item;
    this.carService = carService;
    this.animationController = animationController;
    this.actions = actions;
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
    this.actions.hideAlert();

    this.carService.returnCar(this.id).catch(showErrorModal);
  }

  public startCar(): void {
    apiService
      .startCar(this.id)
      .then((response) => {
        const { velocity, distance } = response;
        return distance / velocity;
      })
      .then((duration) => {
        this.animationController.drive(duration);
        return apiService.driveCar(this.id);
      })
      .catch((error: unknown) => {
        if (
          error instanceof EngineError &&
          error.statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ) {
          this.animationController.pause();
          this.actions.showAlert();
        } else {
          showErrorModal(error);
        }
      });
  }

  public updateCar(newName: string, newColor: string): Promise<void> {
    return this.carService.editCar(this.id, newName, newColor);
  }
}
