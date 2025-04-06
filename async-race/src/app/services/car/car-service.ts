import type { Store } from '~/app/types/interfaces';

import { DEFAULT_INCREMENT, DEFAULT_PAGE } from '~/app/constants/constants';
import { isExceeding, isOnCurrent } from '~/app/utils/check-page';

import {
  createCar,
  deleteCar,
  getCars,
  stopCar,
  updateCar,
} from '../api/api-service';

export interface CarService {
  goToPage: (page: number) => Promise<void>;

  addCar: (name: string, color: string) => Promise<void>;

  removeCar: (id: number) => Promise<void>;

  editCar: (id: number, newName: string, newColor: string) => Promise<void>;

  returnCar: (id: number) => Promise<void>;
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

  const removeCar = async (id: number): Promise<void> => {
    await deleteCar(id);

    const { currentPage, carsCount: currentCount } = store.getState();

    const updatedCount = currentCount - DEFAULT_INCREMENT;

    const updatedPage = isExceeding(currentPage, updatedCount)
      ? currentPage - DEFAULT_INCREMENT || DEFAULT_PAGE
      : currentPage;

    await goToPage(updatedPage);
  };

  const editCar = async (
    id: number,
    newName: string,
    newColor: string
  ): Promise<void> => {
    await updateCar({ id, name: newName, color: newColor });

    const { currentPage } = store.getState();

    await goToPage(currentPage);
  };

  // eslint-disable-next-line unicorn/consistent-function-scoping
  const returnCar = async (id: number): Promise<void> => {
    await stopCar(id);
  };

  return { goToPage, addCar, removeCar, editCar, returnCar };
}
