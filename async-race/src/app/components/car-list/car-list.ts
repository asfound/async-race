import type { Store } from '~/app/types/interfaces';
import type { Render } from '~/app/types/types';

import { loadCars } from '~/app/pages/garage/utils/load-cars';
import { EventType } from '~/app/types/enums';
import { isOnCurrent } from '~/app/utils/check-page';
import { ul } from '~/app/utils/create-element';

import styles from './car-list.module.css';

export function createCarList(store: Store): HTMLUListElement {
  const carsList = ul({ className: styles.list });

  const render: Render = ({ currentPage }) => {
    carsList.replaceChildren();
    loadCars(carsList, currentPage);
  };

  store.subscribe(EventType.PAGE_CHANGE, render);

  store.subscribe(EventType.COUNT_CHANGE, (state) => {
    const { currentPage, carsCount } = state;

    if (isOnCurrent(currentPage, carsCount)) {
      render(state);
    }
  });

  render(store.getState());

  return carsList;
}
