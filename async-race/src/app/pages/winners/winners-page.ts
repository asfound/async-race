import type { Store } from '~/app/types/interfaces';
import type { Render } from '~/app/types/types';

import { createSortingPanel } from '~/app/components/sorting-panel/sorting-panel';
import { createWinnersTable } from '~/app/components/winners-table/winners-table';
import { createWinnersTitle } from '~/app/components/winners-title/winners-title';
import { DEFAULT_PAGE } from '~/app/constants/constants';
import {
  apiService,
  SortField,
  SortOrder,
} from '~/app/services/api/api-service';
import { showErrorModal } from '~/app/utils/show-modal';

import { div } from '../../utils/create-element';

export function createWinnersPage(store: Store): HTMLElement {
  const container = div({});

  const render: Render = ({ winnersOnCurrentPage, winnersCars }) => {
    container.replaceChildren();

    const titleContainer = createWinnersTitle(store);

    const sortingPanel = createSortingPanel();

    const winnersTable = createWinnersTable(winnersOnCurrentPage, winnersCars);

    container.append(titleContainer, sortingPanel, winnersTable);
  };

  apiService
    .getWinners(DEFAULT_PAGE, SortField.TIME, SortOrder.DESC)
    .then((result) => {
      const { winners, totalWinners } = result;

      store.updateState({
        winnersOnCurrentPage: winners,
        winnersCount: totalWinners,
        winnersCars: [],
      });

      return winners;
    })
    .then(async (winners) => {
      const cars = await Promise.all(
        winners.map((winner) => apiService.getCar(winner.id))
      );

      store.updateState({
        winnersCars: cars,
      });

      render(store.getState());
    })
    .catch(showErrorModal);

  return container;
}
