import type { CarService } from '~/app/services/car/car-service';
import type { RaceService } from '~/app/services/race/race-service';
import type { Store } from '~/app/types/interfaces';
import type { Render } from '~/app/types/types';

import { EventType } from '~/app/types/enums';
import { ul } from '~/app/utils/create-element';

import { createCarItem } from '../car-item/car-item';
import styles from './car-list.module.css';

export function createCarList(
  store: Store,
  carService: CarService,
  raceService: RaceService
): HTMLUListElement {
  const carsList = ul({ className: styles.list });

  const render: Render = ({ carsOnCurrentPage }) => {
    carsList.replaceChildren();

    const carItems = carsOnCurrentPage.map((carProperties) =>
      createCarItem(carProperties, carService, raceService, store)
    );

    carsList.append(...carItems);
  };

  store.subscribe(EventType.PAGE_CHANGE, (state) => {
    raceService.clearControllers();
    render(state);
  });

  render(store.getState());

  return carsList;
}
