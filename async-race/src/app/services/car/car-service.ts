import type { Store } from '~/app/types/interfaces';

import { DEFAULT_INCREMENT } from '~/app/constants/constants';
import { isOnCurrent } from '~/app/utils/check-page';

import { createCar, getCars } from '../api/api-service';

export interface CarService {
  goToPage: (page: number) => Promise<void>;

  addCar: (name: string, color: string) => Promise<void>;
}

export function createCarService(store: Store): CarService {
  const goToPage = async (page: number): Promise<void> => {
    const { cars, totalCount } = await getCars(page);

    store.updateState({ carsOnCurrentPage: cars });
    store.setCount({ carsCount: totalCount });
    store.setPage({ currentPage: page });
  };

  const addCar = async (name: string, color: string): Promise<void> => {
    await createCar(name, color);
    const { currentPage, carsCount } = store.getState();
    const newCount = carsCount + DEFAULT_INCREMENT;

    if (isOnCurrent(currentPage, newCount)) {
      await goToPage(currentPage);
    } else {
      store.setCount({ carsCount: newCount });
    }
  };

  return { goToPage, addCar };
}
