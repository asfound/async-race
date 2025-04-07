import type { Store } from '~/app/types/interfaces';
import type { Render } from '~/app/types/types';

import { createWinnersTable } from '~/app/components/winners-table/winners-table';
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

    console.log(winnersOnCurrentPage);

    const winnersTable = createWinnersTable(winnersOnCurrentPage, winnersCars);

    container.append(winnersTable);
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
