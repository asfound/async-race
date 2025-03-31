import { ul } from '~/app/utils/create-element';

import { createCarItem } from './car-track/car-track';

export function createCarsList(): HTMLUListElement {
  const carsList = ul({}, [createCarItem(), createCarItem()]);

  return carsList;
}
