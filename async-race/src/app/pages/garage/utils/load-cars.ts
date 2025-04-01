import type { CarItemProperties } from '~/app/types/interfaces';

import { getCars } from '~/app/services/api/async-race-api';

import { renderCarsList } from './render-list';

export function loadAndRenderCars(
  carsList: HTMLUListElement,
  currentPage: number
): void {
  loadCars(currentPage)
    .then(({ cars }) => {
      renderCarsList(cars, carsList);
    })
    .catch((error: unknown) => {
      console.error('Error loading cars:', error);
    });
}

async function loadCars(page: number): Promise<{
  cars: CarItemProperties[];
  totalCount: number;
}> {
  try {
    return await getCars(page);
  } catch {
    return { cars: [], totalCount: 0 };
  }
}
