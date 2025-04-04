import type { Store } from '~/app/types/interfaces';
import type { CarAdditionHandler } from '~/app/types/types';

import { createSettingsForm } from '~/app/components/car-settings-form/car-settings-form';
import { createPaginationControls } from '~/app/components/garage-pagination-controls/garage-pagination-controls';
import { createGarageTitle } from '~/app/components/garage-title/garage-title';
import { createRaceControls } from '~/app/components/race-controls/race-controls';
import {
  BUTTON_TEXT,
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
  const { currentPage, carsCount, nameInputValue, colorInputValue } =
    store.getState();

  const carAdditionHandler = createCarAdditionHandler(store);

  const nameInputHandler = (name: string): void => {
    store.setColor({ nameInputValue: name });
  };

  const colorInputHandler = (color: string): void => {
    store.setColor({ colorInputValue: color });
  };

  const container = div({});

  const { titleContainer, updateCounter } = createGarageTitle(carsCount);

  const raceControls = createRaceControls(store);

  const carCreationForm = createSettingsForm(
    BUTTON_TEXT.ADD_CAR,
    carAdditionHandler,
    nameInputValue,
    colorInputValue,
    { nameInputHandler, colorInputHandler }
  );

  carCreationForm.classList.add(styles.form);

  container.append(titleContainer, raceControls, carCreationForm);

  const paginationControls = createPaginationControls(store);

  const carsList = ul({ className: styles.list });

  loadCars(carsList, currentPage);

  store.subscribe(EventType.PAGE_CHANGE, ({ currentPage = DEFAULT_PAGE }) => {
    loadCars(carsList, currentPage);
  });

  store.subscribe(EventType.COUNT_CHANGE, ({ currentPage, carsCount }) => {
    if (currentPage && carsCount !== undefined) {
      if (isOnCurrent(currentPage, carsCount)) {
        loadCars(carsList, currentPage);
      }

      updateCounter(carsCount);
    }
  });

  container.append(paginationControls, carsList);

  return container;
}

function createCarAdditionHandler(store: Store): CarAdditionHandler {
  return async (name, color): Promise<void> => {
    try {
      await createCar(name, color);
      const { carsCount: currentCount } = store.getState();

      store.setCount({ carsCount: currentCount + DEFAULT_INCREMENT });
    } catch (error: unknown) {
      console.error(error);
    }
  };
}
