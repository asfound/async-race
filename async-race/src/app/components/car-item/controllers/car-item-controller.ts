import type { CarService } from '~/app/services/car/car-service';

import { showErrorModal } from '~/app/utils/show-error-modal';

export interface CarItemController {
  removeCar: (id: number) => void;
}

export function createCarItemController(
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
  };
}
