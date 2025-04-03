import type { CarItemProperties } from '~/app/types/interfaces';

import { createCarItem } from '../../../components/car-item/car-item';

export function renderCarsList(
  cars: CarItemProperties[],
  carsList: HTMLUListElement
): void {
  carsList.replaceChildren();

  for (const carData of cars) {
    const item = createCarItem(carData);

    carsList.append(item);
  }
}
