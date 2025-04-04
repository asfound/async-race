import type { Store } from '~/app/types/interfaces';

import { DEFAULT_INCREMENT, EMPTY_COUNT } from '~/app/constants/constants';
import { createCar } from '~/app/services/api/async-race-api';
import { getRandomColor } from '~/app/utils/get-random-color';
import { getRandomName } from '~/app/utils/get-random-name';

export async function generateCars(store: Store): Promise<void> {
  for (
    let index = EMPTY_COUNT;
    index < CARS_AMOUNT;
    index += DEFAULT_INCREMENT
  ) {
    const name = getRandomName();
    const color = getRandomColor();

    try {
      await createCar(name, color);
      const { carsCount: currentCount } = store.getState();

      store.setCount({ carsCount: currentCount + DEFAULT_INCREMENT });
    } catch (error) {
      console.error(
        `Error creating car ${String(index + DEFAULT_INCREMENT)}:`,
        error
      );
    }
  }
}

const CARS_AMOUNT = 100;
