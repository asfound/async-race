import type { CarService } from '~/app/services/car/car-service';

import { showErrorModal } from '~/app/utils/show-error-modal';

export interface CarItemController {
  removeCar: (id: number) => void;

  updateCar: (newName: string, newColor: string) => void;
}

export function createCarItemController(
  id: number,
  item: HTMLLIElement,
  carService: CarService
): CarItemController {
  return {
    removeCar: (id: number): void => {
      carService
        .removeCar(id)
        .catch(showErrorModal)
        .finally(() => {
          item.remove();
        });
    },

    updateCar: (newName: string, newColor: string): void => {
      carService.editCar(id, newName, newColor).catch(showErrorModal);
    },
  };
}
