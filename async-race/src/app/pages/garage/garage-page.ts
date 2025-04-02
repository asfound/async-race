import { DEFAULT_PAGE, EventType, store } from '~/app/store/store';

import { createButton } from '../../components/button/button';
import { createCar } from '../../services/api/async-race-api';
import { div, ul } from '../../utils/create-element';
import { getRandomColor } from '../../utils/get-random-color';
import { getRandomName } from '../../utils/get-random-name';
import { loadAndRenderCars } from './utils/load-cars';

const NEXT = 1;

export function createGaragePage(): HTMLElement {
  const container = div({}, ['Garage']);
  const carsList = ul({});

  const addCarButton = createButton({
    textContent: 'Add Car',
    onClick: () => {
      createCar(getRandomName(), getRandomColor())
        .then(() => {
          loadAndRenderCars(carsList, store.getState().currentPage);
        })
        .catch((error: unknown) => {
          console.error('Error during car creation or loading:', error);
        });
    },
  });

  const nextPageButton = createButton({
    textContent: 'Next',
    onClick: () => {
      const { currentPage } = store.getState();
      store.setPage({ currentPage: currentPage + NEXT });
    },
  });

  loadAndRenderCars(carsList, store.getState().currentPage);

  store.subscribe(EventType.PAGE_CHANGE, ({ currentPage = DEFAULT_PAGE }) => {
    loadAndRenderCars(carsList, currentPage);
  });

  container.append(addCarButton, nextPageButton, carsList);

  return container;
}
