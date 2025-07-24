import type { Store } from '~/app/types/interfaces';
import type { Render } from '~/app/types/types';

import { EventType } from '~/app/types/enums';
import { div } from '~/app/utils/create-element';

import { createSortingPanel } from '../sorting-panel/sorting-panel';
import { createWinnersTable } from '../winners-table/winners-table';

export function createWinnersList(store: Store): HTMLElement {
  const container = div({});

  const render: Render = ({ winnersOnCurrentPage, winnersCars }): void => {
    container.replaceChildren();
    const sortingPanel = createSortingPanel(store);

    const winnersTable = createWinnersTable(
      winnersOnCurrentPage,
      winnersCars,
      store
    );

    container.append(sortingPanel, winnersTable);
  };

  store.subscribe(EventType.WINNERS_PAGE_CHANGE, render);
  render(store.getState());

  return container;
}
