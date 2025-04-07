import type { Store } from '~/app/types/interfaces';
import type { PaginationPropertiesGetter, Render } from '~/app/types/types';

import { createPaginationControls } from '~/app/components/pagination-controls/pagination-controls';
import { createWinnersList } from '~/app/components/winners-list/winners-list';
import { createWinnersTitle } from '~/app/components/winners-title/winners-title';
import { DEFAULT_PAGE, WINNERS_PER_PAGE } from '~/app/constants/constants';
import { winnersService } from '~/app/services/winners/winners-service';

import { div } from '../../utils/create-element';

export function createWinnersPage(store: Store): HTMLElement {
  const container = div({});

  const winnersPaginationPropertiesGetter: PaginationPropertiesGetter = (
    state
  ) => {
    return {
      currentPage: state.currentWinnersPage,
      itemsCount: state.winnersCount,
      itemsPerPage: WINNERS_PER_PAGE,
      onPageChange: (newPage): void => {
        winnersService.setWinners(
          store,
          newPage,
          state.sortField,
          state.sortOrder
        );
      },
      isDisabled: false,
    };
  };

  const { sortField, sortOrder } = store.getState();

  winnersService.setWinners(store, DEFAULT_PAGE, sortField, sortOrder);

  const render: Render = () => {
    container.replaceChildren();

    const titleContainer = createWinnersTitle(store);

    const paginationControls = createPaginationControls(
      store,
      winnersPaginationPropertiesGetter,
      []
    );

    const winnersList = createWinnersList(store);

    container.append(titleContainer, paginationControls, winnersList);
  };

  render(store.getState());

  return container;
}
