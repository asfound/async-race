import { ul } from '~/app/utils/create-element';

import { createCarItem } from './car-item/car-item';

export function createCarsList(): HTMLUListElement {
  const carsList = ul({}, [createCarItem(), createCarItem()]);

  return carsList;
}
