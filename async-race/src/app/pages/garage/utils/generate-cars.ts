import type { Store } from '~/app/types/interfaces';

import { DEFAULT_INCREMENT, EMPTY_COUNT } from '~/app/constants/constants';
import { apiService } from '~/app/services/api/api-service';
import { getRandomColor } from '~/app/utils/get-random-color';
import { getRandomName } from '~/app/utils/get-random-name';
import { showErrorModal } from '~/app/utils/show-modal';

export async function generateCars(store: Store): Promise<void> {
  for (
    let index = EMPTY_COUNT;
    index < CARS_AMOUNT;
    index += DEFAULT_INCREMENT
  ) {
    const name = getRandomName();
    const color = getRandomColor();

    try {
      await apiService.createCar(name, color);
      const { carsCount: currentCount } = store.getState();

      store.setCount({ carsCount: currentCount + DEFAULT_INCREMENT });
    } catch (error) {
      showErrorModal(error);
    }
  }
}

const CARS_AMOUNT = 100;
