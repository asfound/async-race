import type { CarService } from '~/app/services/car/car-service';

import { HTTP_STATUS } from '~/app/constants/constants';
import { apiService, driveCar } from '~/app/services/api/api-service';
import { EngineError } from '~/app/utils/custom-errors';
import { showErrorModal } from '~/app/utils/show-error-modal';

import type { CarAnimationController } from './animation-controller';

interface CarItemActions {
  showAlert: () => void;
  hideAlert: () => void;
}

export interface CarItemController {
  removeCar: () => void;

  returnCar: () => void;

  startCar: () => void;

  updateCar: (newName: string, newColor: string) => void;
}

export function createCarItemController(
  id: number,
  item: HTMLLIElement,
  carService: CarService,
  animationController: CarAnimationController,
  actions: CarItemActions
): CarItemController {
  return {
    removeCar: (): void => {
      carService
        .removeCar(id)
        .catch(showErrorModal)
        .finally(() => {
          item.remove();
        });
    },

    returnCar: (): void => {
      animationController.stop();
      actions.hideAlert();

      carService.returnCar(id).catch(showErrorModal);
    },

    startCar: (): void => {
      apiService
        .startCar(id)
        .then((response) => {
          const { velocity, distance } = response;
          return distance / velocity;
        })
        .then((duration) => {
          animationController.drive(duration);
          return driveCar(id);
        })
        .catch((error: unknown) => {
          if (
            error instanceof EngineError &&
            error.statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
          ) {
            animationController.pause();
            actions.showAlert();
          } else {
            showErrorModal(error);
          }
        });
    },

    updateCar: (newName: string, newColor: string): void => {
      carService.editCar(id, newName, newColor).catch(showErrorModal);
    },
  };
}
