import type { Store } from '~/app/types/interfaces';

import {
  BUTTON_TEXT_CONTENT,
  DEFAULT_INCREMENT,
  DEFAULT_PAGE,
} from '~/app/constants/constants';
import { store } from '~/app/store/store';
import { EventType } from '~/app/types/enums';

import { createButton } from '../../components/button/button';
import { createCar } from '../../services/api/async-race-api';
import { div, span, ul } from '../../utils/create-element';
import { getRandomColor } from '../../utils/get-random-color';
import { getRandomName } from '../../utils/get-random-name';
import { isOnCurrent, isOnFirst, isOnLast } from './utils/check-page';
import { loadCars } from './utils/load-cars';

export function createGaragePage(): HTMLElement {
  const container = div({});
  // TODO add h1 with garage

  const carsList = ul({});

  const paginationControls = createPaginationControls(store);

  const addCarButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.ADD_CAR,
    onClick: () => {
      createCar(getRandomName(), getRandomColor())
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
    },
  });

  loadCars(carsList, store.getState().currentPage);

  store.subscribe(EventType.PAGE_CHANGE, ({ currentPage = DEFAULT_PAGE }) => {
    loadCars(carsList, currentPage);
  });

  container.append(addCarButton, paginationControls, carsList);

  return container;
}

function createPaginationControls(store: Store): HTMLElement {
  const paginationContainer = div({});

  const { currentPage, carsCount } = store.getState();

  const previousPageButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.PREVIOUS,
    onClick: () => {
      const { currentPage } = store.getState();

      store.setPage({ currentPage: currentPage - DEFAULT_INCREMENT });
    },
  });

  const pageNumber = span({
    textContent: String(currentPage),
  });

  const nextPageButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.NEXT,
    onClick: () => {
      const { currentPage } = store.getState();

      store.setPage({ currentPage: currentPage + DEFAULT_INCREMENT });
    },
  });

  const carsCounter = span({
    textContent: `Total cars: ${String(carsCount)}`,
  });

  const setButtonsState = (currentPage: number, carsCount: number): void => {
    nextPageButton.disabled = isOnLast(currentPage, carsCount);
    previousPageButton.disabled = isOnFirst(currentPage);
  };

  setButtonsState(currentPage, carsCount);

  store.subscribe(EventType.PAGE_CHANGE, ({ currentPage, carsCount }) => {
    if (currentPage && carsCount) {
      setButtonsState(currentPage, carsCount);
    }

    pageNumber.textContent = String(currentPage);
  });

  store.subscribe(EventType.COUNT_CHANGE, ({ currentPage, carsCount }) => {
    if (currentPage && carsCount) {
      setButtonsState(currentPage, carsCount);
    }

    carsCounter.textContent = `Total cars: ${String(carsCount)}`;
  });

  paginationContainer.append(
    previousPageButton,
    pageNumber,
    nextPageButton,
    carsCounter
  );

  return paginationContainer;
}
