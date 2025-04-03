import type { Store } from '~/app/types/interfaces';

import {
  BUTTON_TEXT_CONTENT,
  DEFAULT_INCREMENT,
} from '~/app/constants/constants';
import { EventType } from '~/app/types/enums';
import { isOnLast, isOnFirst } from '~/app/utils/check-page';
import { div, span } from '~/app/utils/create-element';

import { createButton } from '../button/button';

export function createPaginationControls(store: Store): HTMLElement {
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
