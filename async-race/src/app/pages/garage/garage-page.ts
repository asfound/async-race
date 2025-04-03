import { createSettingsForm } from '~/app/components/car-settings-form/car-settings-form';
import { createPaginationControls } from '~/app/components/garage-pagination-controls/garage-pagination-controls';
import {
  BUTTON_TEXT_CONTENT,
  DEFAULT_INCREMENT,
  DEFAULT_PAGE,
} from '~/app/constants/constants';
import { store } from '~/app/store/store';
import { EventType } from '~/app/types/enums';

import { createCar } from '../../services/api/async-race-api';
import { isOnCurrent } from '../../utils/check-page';
import { div, span, ul } from '../../utils/create-element';
import styles from './garage-page.module.css';
import { loadCars } from './utils/load-cars';

export function createGaragePage(): HTMLElement {
  const container = div({});
  // TODO add h1 with garage

  const carsList = ul({ className: styles.list });

  const paginationControls = createPaginationControls(store);

  const addCarHandler = (name: string, color: string): void => {
    createCar(name, color)
      .then(() => {
        const { currentPage, carsCount: currentCount } = store.getState();

        if (isOnCurrent(currentPage, currentCount)) {
          loadCars(carsList, currentPage);
        }

        store.setCount({ carsCount: currentCount + DEFAULT_INCREMENT });
      })
      .catch((error: unknown) => {
        console.error('Error during car creation or loading:', error);
      });
  };

  const { currentPage, carsCount } = store.getState();

  const carsCounter = span({
    textContent: `Total cars: ${String(carsCount)}`,
  });

  const addCarForm = createSettingsForm(
    BUTTON_TEXT_CONTENT.ADD_CAR,
    addCarHandler
  );

  loadCars(carsList, currentPage);

  store.subscribe(EventType.PAGE_CHANGE, ({ currentPage = DEFAULT_PAGE }) => {
    loadCars(carsList, currentPage);
  });

  store.subscribe(EventType.COUNT_CHANGE, ({ carsCount }) => {
    carsCounter.textContent = `Total cars: ${String(carsCount)}`;
  });

  container.append(addCarForm, carsCounter, paginationControls, carsList);

  return container;
}
