import { createCar } from '~/app/services/api/async-race-api';
import { ul } from '~/app/utils/create-element';
import { assertIsCarItemProperties } from '~/app/utils/type-guards';

import { createCarItem } from './car-item/car-item';

export function createCarsList(): {
  list: HTMLUListElement;
  addCar: (name: string, color: string) => Promise<void>;
} {
  const carsList = ul({});

  async function addCar(name: string, color: string): Promise<void> {
    const newCarData = await createCar(name, color);

    assertIsCarItemProperties(newCarData);

    const newCarItem = createCarItem(newCarData);
    carsList.append(newCarItem);
  }

  return { list: carsList, addCar };
}
