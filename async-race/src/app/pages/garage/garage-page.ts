import { createSettingsForm } from '~/app/components/car-settings-form/car-settings-form';
import { createPaginationControls } from '~/app/components/pagination-controls/pagination-controls';
import {
  BUTTON_TEXT_CONTENT,
  DEFAULT_INCREMENT,
  DEFAULT_PAGE,
} from '~/app/constants/constants';
import { store } from '~/app/store/store';
import { EventType } from '~/app/types/enums';

import { createCar } from '../../services/api/async-race-api';
import { isOnCurrent } from '../../utils/check-page';
import { div, ul } from '../../utils/create-element';
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

  const addCarForm = createSettingsForm(
    BUTTON_TEXT_CONTENT.ADD_CAR,
    addCarHandler
  );

  loadCars(carsList, store.getState().currentPage);

  store.subscribe(EventType.PAGE_CHANGE, ({ currentPage = DEFAULT_PAGE }) => {
    loadCars(carsList, currentPage);
  });

  container.append(addCarForm, paginationControls, carsList);

  return container;
}
