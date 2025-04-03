import { createSettingsForm } from '~/app/components/car-settings-form/car-settings-form';
import { createPaginationControls } from '~/app/components/garage-pagination-controls/garage-pagination-controls';
import {
  BUTTON_TEXT,
  DEFAULT_INCREMENT,
  DEFAULT_PAGE,
  EMPTY_COUNT,
  TITLES,
} from '~/app/constants/constants';
import { store } from '~/app/store/store';
import { EventType } from '~/app/types/enums';

import { createCar } from '../../services/api/async-race-api';
import { isOnCurrent } from '../../utils/check-page';
import { div, h1, span, ul } from '../../utils/create-element';
import styles from './garage-page.module.css';
import { loadCars } from './utils/load-cars';

export function createGaragePage(): HTMLElement {
  const { currentPage, carsCount } = store.getState();

  const carAdditionHandler = (name: string, color: string): void => {
    createCar(name, color)
      .then(() => {
        const { carsCount: currentCount } = store.getState();

        store.setCount({ carsCount: currentCount + DEFAULT_INCREMENT });
      })
      .catch((error: unknown) => {
        console.error('Error during car creation or loading:', error);
      });
  };

  const container = div({});

  const pageTitle = h1({ textContent: TITLES.GARAGE });

  const addCarForm = createSettingsForm(
    BUTTON_TEXT.ADD_CAR,
    carAdditionHandler
  );

  const carsCounter = span({
    textContent: `Total cars: ${String(carsCount)}`,
  });

  container.append(pageTitle, addCarForm, carsCounter);

  const paginationControls = createPaginationControls(store);

  const carsList = ul({ className: styles.list });

  loadCars(carsList, currentPage);

  store.subscribe(EventType.PAGE_CHANGE, ({ currentPage = DEFAULT_PAGE }) => {
    loadCars(carsList, currentPage);
  });

  store.subscribe(EventType.COUNT_CHANGE, ({ currentPage, carsCount }) => {
    const previousCount = (carsCount ?? EMPTY_COUNT) - DEFAULT_INCREMENT;

    if (currentPage && isOnCurrent(currentPage, previousCount)) {
      loadCars(carsList, currentPage);
    }

    carsCounter.textContent = `Total cars: ${String(carsCount)}`;
  });

  container.append(paginationControls, carsList);

  return container;
}
