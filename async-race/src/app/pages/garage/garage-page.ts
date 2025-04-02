import type { Store } from '~/app/store/store';

import {
  BUTTON_TEXT_CONTENT,
  DEFAULT_INCREMENT,
} from '~/app/constants/constants';
import { DEFAULT_PAGE, EventType, store } from '~/app/store/store';

import { createButton } from '../../components/button/button';
import { createCar } from '../../services/api/async-race-api';
import { div, span, ul } from '../../utils/create-element';
import { getRandomColor } from '../../utils/get-random-color';
import { getRandomName } from '../../utils/get-random-name';
import { checkIfOnCurrent, checkIfOnLast } from './utils/check-page';
import { loadCars } from './utils/load-cars';

export function createGaragePage(): HTMLElement {
  const container = div({}, ['Garage']);

  const carsList = ul({});

  const paginationControls = createPaginationControls(store);

  const addCarButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.ADD_CAR,
    onClick: () => {
      createCar(getRandomName(), getRandomColor())
        .then(() => {
          const { currentPage, carsCount: currentCount } = store.getState();

          const updatedCount = currentCount + DEFAULT_INCREMENT;

          store.setCount({ carsCount: updatedCount });

          if (checkIfOnCurrent(currentPage, updatedCount)) {
            loadCars(carsList, store.getState().currentPage);
          }
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

  const currentPage = store.getState().currentPage;

  const previousPageButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.PREVIOUS,
    onClick: () => {
      const { currentPage } = store.getState();
      store.setPage({ currentPage: currentPage - DEFAULT_INCREMENT });

      if (currentPage === DEFAULT_PAGE + DEFAULT_INCREMENT) {
        previousPageButton.disabled = true;
      }

      nextPageButton.disabled = false;
    },
  });

  const pageNumber = span({
    textContent: String(currentPage),
  });

  const nextPageButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.NEXT,
    onClick: () => {
      const { currentPage, carsCount } = store.getState();

      const nextPage = currentPage + DEFAULT_INCREMENT;

      store.setPage({ currentPage: nextPage });

      if (currentPage === DEFAULT_PAGE) {
        previousPageButton.disabled = false;
      }

      if (checkIfOnLast(nextPage, carsCount)) {
        nextPageButton.disabled = true;
      }
    },
  });

  if (currentPage === DEFAULT_PAGE) {
    previousPageButton.disabled = true;
  }

  store.subscribe(EventType.PAGE_CHANGE, ({ currentPage = DEFAULT_PAGE }) => {
    pageNumber.textContent = String(currentPage);
  });

  paginationContainer.append(previousPageButton, pageNumber, nextPageButton);

  return paginationContainer;
}
