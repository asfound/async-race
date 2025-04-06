import type { CarService } from '~/app/services/car/car-service';

import { DEFAULT_INCREMENT, EMPTY_COUNT } from '~/app/constants/constants';
import { getRandomColor } from '~/app/utils/get-random-color';
import { getRandomName } from '~/app/utils/get-random-name';
import { showErrorModal } from '~/app/utils/show-modal';

export async function generateCars(carService: CarService): Promise<void> {
  for (
    let index = EMPTY_COUNT;
    index < CARS_AMOUNT;
    index += DEFAULT_INCREMENT
  ) {
    const name = getRandomName();
    const color = getRandomColor();

    try {
      await carService.addCar(name, color);
    } catch (error) {
      showErrorModal(error);
    }
  }
}

const CARS_AMOUNT = 100;
