import type { CarItemProperties } from '~/app/types/interfaces';

import { DEFAULT_NUMBER_VALUE } from '~/app/constants/constants';

import { createCarItem } from '../../../components/car-item/car-item';

const removeCallbacks = new Map<number, () => void>();

export function renderCarsList(
  cars: CarItemProperties[],
  carsList: HTMLUListElement
): void {
  if (removeCallbacks.size > DEFAULT_NUMBER_VALUE) {
    for (const [, removeListener] of removeCallbacks) {
      removeListener();
    }
  }
  removeCallbacks.clear();

  carsList.replaceChildren();

  for (const carData of cars) {
    const { item, removeListeners } = createCarItem(carData);

    carsList.append(item);
    removeCallbacks.set(carData.id, removeListeners);
  }
}
