import type { Store } from '~/app/types/interfaces';
import type { Render } from '~/app/types/types';

import { BUTTON_TEXT, DEFAULT_INCREMENT } from '~/app/constants/constants';
import { EventType } from '~/app/types/enums';
import { isOnLast, isOnFirst, calculateLastPage } from '~/app/utils/check-page';
import { div, span } from '~/app/utils/create-element';

import { createButton } from '../button/button';
import styles from './garage-pagination-controls.module.css';

export function createPaginationControls(store: Store): HTMLElement {
  const paginationContainer = div({ className: styles.container });

  const render: Render = ({ currentPage, carsCount }) => {
    paginationContainer.replaceChildren();

    const pageNumber = span({
      textContent: `${String(currentPage)}/${String(calculateLastPage(carsCount))}`,
    });

    const previousPageButton = createPreviousButton(store);
    const nextPageButton = createNextButton(store);

    nextPageButton.disabled = isOnLast(currentPage, carsCount);
    previousPageButton.disabled = isOnFirst(currentPage);

    paginationContainer.append(previousPageButton, pageNumber, nextPageButton);
  };

  store.subscribe(EventType.PAGE_CHANGE, render);
  store.subscribe(EventType.COUNT_CHANGE, render);

  render(store.getState());

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
