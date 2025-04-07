import type { Store } from '~/app/types/interfaces';
import type { Render } from '~/app/types/types';

import { createSortingPanel } from '~/app/components/sorting-panel/sorting-panel';
import { createWinnersTable } from '~/app/components/winners-table/winners-table';
import { createWinnersTitle } from '~/app/components/winners-title/winners-title';
import { DEFAULT_PAGE } from '~/app/constants/constants';
import { winnersService } from '~/app/services/winners/winners-service';
import { EventType } from '~/app/types/enums';

import { div } from '../../utils/create-element';

export function createWinnersPage(store: Store): HTMLElement {
  const container = div({});

  const { sortField, sortOrder } = store.getState();

  winnersService.setWinners(store, DEFAULT_PAGE, sortField, sortOrder);

  const render: Render = ({ winnersOnCurrentPage, winnersCars }) => {
    container.replaceChildren();

    const titleContainer = createWinnersTitle(store);

    const sortingPanel = createSortingPanel(store);

    const winnersTable = createWinnersTable(
      winnersOnCurrentPage,
      winnersCars,
      store
    );

    container.append(titleContainer, sortingPanel, winnersTable);
  };

  render(store.getState());

  store.subscribe(EventType.WINNERS_PAGE_CHANGE, render);

  return container;
}
