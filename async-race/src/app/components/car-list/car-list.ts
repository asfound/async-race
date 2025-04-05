import type { Store } from '~/app/types/interfaces';
import type { Render } from '~/app/types/types';

import { EventType } from '~/app/types/enums';
import { isOnCurrent } from '~/app/utils/check-page';
import { ul } from '~/app/utils/create-element';

import { createCarItem } from '../car-item/car-item';
import styles from './car-list.module.css';

export function createCarList(store: Store): HTMLUListElement {
  const carsList = ul({ className: styles.list });

  const render: Render = ({ carsOnCurrentPage }) => {
    carsList.replaceChildren();

    const carItems = carsOnCurrentPage.map((carProperties) =>
      createCarItem(carProperties)
    );

    carsList.append(...carItems);
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
