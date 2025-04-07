import type { EventType } from '~/app/types/enums';
import type { Store } from '~/app/types/interfaces';
import type { PaginationPropertiesGetter, Render } from '~/app/types/types';

import { BUTTON_TEXT, DEFAULT_INCREMENT } from '~/app/constants/constants';
import { isOnLast, isOnFirst, calculateLastPage } from '~/app/utils/check-page';
import { div, span } from '~/app/utils/create-element';

import { createButton } from '../button/button';
import styles from './pagination-controls.module.css';

export function createPaginationControls(
  store: Store,
  propertiesProvider: PaginationPropertiesGetter,
  events: EventType[]
): HTMLElement {
  const paginationContainer = div({ className: styles.container });

  const render: Render = (state) => {
    paginationContainer.replaceChildren();

    const { currentPage, itemsCount, itemsPerPage, onPageChange } =
      propertiesProvider(state);

    const pageNumber = span({
      textContent: `${String(currentPage)}/${String(calculateLastPage(itemsCount, itemsPerPage))}`,
    });

    const previousPageButton = createButton({
      textContent: BUTTON_TEXT.PREVIOUS,
      onClick: () => {
        onPageChange(currentPage - DEFAULT_INCREMENT);
      },
    });
    const nextPageButton = createButton({
      textContent: BUTTON_TEXT.NEXT,
      onClick: () => {
        onPageChange(currentPage + DEFAULT_INCREMENT);
      },
    });

    nextPageButton.disabled = isOnLast(currentPage, itemsCount, itemsPerPage);
    previousPageButton.disabled = isOnFirst(currentPage);

    paginationContainer.append(previousPageButton, pageNumber, nextPageButton);
  };

  for (const event of events) {
    store.subscribe(event, render);
  }

  render(store.getState());

  return paginationContainer;
}
