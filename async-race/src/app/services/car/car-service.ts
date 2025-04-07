import type { Store } from '~/app/types/interfaces';

import { DEFAULT_INCREMENT, DEFAULT_PAGE } from '~/app/constants/constants';
import { isExceeding, isOnCurrent } from '~/app/utils/check-page';

import { apiService } from '../api/api-service';

export class CarService {
  private readonly store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  public async goToPage(page: number): Promise<void> {
    const { cars, totalCount } = await apiService.getCars(page);

    this.store.updateState({ carsOnCurrentPage: cars });

    this.store.setCount({ carsCount: totalCount });
    this.store.setPage({ currentPage: page });
  }

  public async addCar(name: string, color: string): Promise<void> {
    await apiService.createCar(name, color);
    const { currentPage, carsCount } = this.store.getState();
    const newCount = carsCount + DEFAULT_INCREMENT;

    if (isOnCurrent(currentPage, newCount)) {
      await this.goToPage(currentPage);
    } else {
      this.store.setCount({ carsCount: newCount });
    }
  }

  public async removeCar(id: number): Promise<void> {
    await apiService.deleteCar(id);

    const { currentPage, carsCount: currentCount } = this.store.getState();

    const updatedCount = currentCount - DEFAULT_INCREMENT;

    const updatedPage = isExceeding(currentPage, updatedCount)
      ? currentPage - DEFAULT_INCREMENT || DEFAULT_PAGE
      : currentPage;

    await this.goToPage(updatedPage);
  }

  public async editCar(
    id: number,
    newName: string,
    newColor: string
  ): Promise<void> {
    await apiService.updateCar({ id, name: newName, color: newColor });
  }

  public async returnCar(id: number): Promise<void> {
    await apiService.stopCar(id);
  }
}
