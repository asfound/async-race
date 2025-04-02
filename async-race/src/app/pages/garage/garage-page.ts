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
import { loadCars } from './utils/load-cars';

export function createGaragePage(): HTMLElement {
  const container = div({}, ['Garage']);
  const carsList = ul({});

  const addCarButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.ADD_CAR,
    onClick: () => {
      createCar(getRandomName(), getRandomColor())
        .then(() => {
          loadCars(carsList, store.getState().currentPage);
        })
        .catch((error: unknown) => {
          console.error('Error during car creation or loading:', error);
        });
    },
  });

  const nextPageButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.NEXT,
    onClick: () => {
      const { currentPage } = store.getState();
      store.setPage({ currentPage: currentPage + DEFAULT_INCREMENT });

      if (currentPage === DEFAULT_PAGE) {
        previousPageButton.disabled = false;
      }
    },
  });

  const previousPageButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.PREVIOUS,
    onClick: () => {
      const { currentPage } = store.getState();
      store.setPage({ currentPage: currentPage - DEFAULT_INCREMENT });

      if (currentPage === DEFAULT_PAGE + DEFAULT_INCREMENT) {
        previousPageButton.disabled = true;
      }
    },
  });

  previousPageButton.disabled = true;

  const currentPage = store.getState().currentPage;

  const pageNumber = span({ textContent: String(currentPage) });

  loadCars(carsList, currentPage);

  store.subscribe(EventType.PAGE_CHANGE, ({ currentPage = DEFAULT_PAGE }) => {
    loadCars(carsList, currentPage);
    pageNumber.textContent = String(currentPage);
  });

  container.append(
    addCarButton,
    previousPageButton,
    pageNumber,
    nextPageButton,
    carsList
  );

  return container;
}
