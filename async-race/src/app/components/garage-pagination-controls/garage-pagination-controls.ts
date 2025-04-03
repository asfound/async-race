import type { Store } from '~/app/types/interfaces';

import { BUTTON_TEXT, DEFAULT_INCREMENT } from '~/app/constants/constants';
import { EventType } from '~/app/types/enums';
import { isOnLast, isOnFirst, calculateLastPage } from '~/app/utils/check-page';
import { div, span } from '~/app/utils/create-element';

import { createButton } from '../button/button';
import styles from './garage-pagination-controls.module.css';

export function createPaginationControls(store: Store): HTMLElement {
  const paginationContainer = div({ className: styles.container });

  const previousPageButton = createPreviousButton(store);

  const { currentPage, carsCount } = store.getState();

  const pageNumber = span({
    textContent: `${String(currentPage)}/${String(calculateLastPage(carsCount))}`,
  });

  const nextPageButton = createNextButton(store);

  const setButtonsState = (currentPage: number, carsCount: number): void => {
    nextPageButton.disabled = isOnLast(currentPage, carsCount);
    previousPageButton.disabled = isOnFirst(currentPage);
  };

  setButtonsState(currentPage, carsCount);

  store.subscribe(EventType.PAGE_CHANGE, ({ currentPage, carsCount }) => {
    if (currentPage && carsCount) {
      setButtonsState(currentPage, carsCount);
      setPageNumberState(pageNumber, currentPage, carsCount);
    }
  });

  store.subscribe(EventType.COUNT_CHANGE, ({ currentPage, carsCount }) => {
    if (currentPage && carsCount) {
      setButtonsState(currentPage, carsCount);
      setPageNumberState(pageNumber, currentPage, carsCount);
    }
  });

  paginationContainer.append(previousPageButton, pageNumber, nextPageButton);

  return paginationContainer;
}

function createPreviousButton(store: Store): HTMLButtonElement {
  return createButton({
    textContent: BUTTON_TEXT.PREVIOUS,
    onClick: () => {
      const { currentPage } = store.getState();

      store.setPage({ currentPage: currentPage - DEFAULT_INCREMENT });
    },
  });
}

function createNextButton(store: Store): HTMLButtonElement {
  return createButton({
    textContent: BUTTON_TEXT.NEXT,
    onClick: () => {
      const { currentPage } = store.getState();

      store.setPage({ currentPage: currentPage + DEFAULT_INCREMENT });
    },
  });
}

function setPageNumberState(
  pageNumber: HTMLElement,
  currentPage: number,
  carsCount: number
): void {
  pageNumber.textContent = `${String(currentPage)}/${String(calculateLastPage(carsCount))}`;
}
