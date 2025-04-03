import { createPaginationControls } from '~/app/components/pagination-controls/pagination-controls';
import {
  BUTTON_TEXT_CONTENT,
  DEFAULT_INCREMENT,
  DEFAULT_PAGE,
} from '~/app/constants/constants';
import { store } from '~/app/store/store';
import { EventType } from '~/app/types/enums';

import { createButton } from '../../components/button/button';
import { createCar } from '../../services/api/async-race-api';
import { isOnCurrent } from '../../utils/check-page';
import { div, ul } from '../../utils/create-element';
import { getRandomColor } from '../../utils/get-random-color';
import { getRandomName } from '../../utils/get-random-name';
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
