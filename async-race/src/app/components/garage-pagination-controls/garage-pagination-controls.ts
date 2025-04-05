import type { CarService } from '~/app/services/car/car-service';
import type { Store } from '~/app/types/interfaces';
import type { Render } from '~/app/types/types';

import { BUTTON_TEXT, DEFAULT_INCREMENT } from '~/app/constants/constants';
import { EventType } from '~/app/types/enums';
import { isOnLast, isOnFirst, calculateLastPage } from '~/app/utils/check-page';
import { div, span } from '~/app/utils/create-element';
import { showErrorModal } from '~/app/utils/show-error-modal';

import { createButton } from '../button/button';
import styles from './garage-pagination-controls.module.css';

export function createPaginationControls(
  store: Store,
  carService: CarService
): HTMLElement {
  const paginationContainer = div({ className: styles.container });

  const render: Render = ({ currentPage, carsCount }) => {
    paginationContainer.replaceChildren();

    const pageNumber = span({
      textContent: `${String(currentPage)}/${String(calculateLastPage(carsCount))}`,
    });

    const previousPageButton = createPreviousButton(store, carService);
    const nextPageButton = createNextButton(store, carService);

    nextPageButton.disabled = isOnLast(currentPage, carsCount);
    previousPageButton.disabled = isOnFirst(currentPage);

    paginationContainer.append(previousPageButton, pageNumber, nextPageButton);
  };

  store.subscribe(EventType.PAGE_CHANGE, render);
  store.subscribe(EventType.COUNT_CHANGE, render);

  render(store.getState());

  return paginationContainer;
}

function createPreviousButton(
  store: Store,
  carService: CarService
): HTMLButtonElement {
  return createButton({
    textContent: BUTTON_TEXT.PREVIOUS,
    onClick: () => {
      const { currentPage } = store.getState();
      carService
        .goToPage(currentPage - DEFAULT_INCREMENT)
        .catch(showErrorModal);
    },
  });
}

function createNextButton(
  store: Store,
  carService: CarService
): HTMLButtonElement {
  return createButton({
    textContent: BUTTON_TEXT.NEXT,
    onClick: () => {
      const { currentPage } = store.getState();
      carService
        .goToPage(currentPage + DEFAULT_INCREMENT)
        .catch(showErrorModal);
    },
  });
}
