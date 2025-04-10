import type { Store } from '~/app/types/interfaces';
import type { PaginationPropertiesGetter, Render } from '~/app/types/types';

import { createMenu } from '~/app/components/menu/menu';
import { createPaginationControls } from '~/app/components/pagination-controls/pagination-controls';
import { createWinnersList } from '~/app/components/winners-list/winners-list';
import { createWinnersTitle } from '~/app/components/winners-title/winners-title';
import { WINNERS_PER_PAGE } from '~/app/constants/constants';
import { winnersService } from '~/app/services/winners/winners-service';
import { EventType } from '~/app/types/enums';

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

  const { sortField, sortOrder, currentWinnersPage } = store.getState();

  winnersService.setWinners(store, currentWinnersPage, sortField, sortOrder);

  const render: Render = () => {
    container.replaceChildren();

    const menuElement = createMenu(store);

    const titleContainer = createWinnersTitle(store);

    const paginationControls = createPaginationControls(
      store,
      winnersPaginationPropertiesGetter,
      [EventType.WINNERS_PAGE_CHANGE]
    );

    const winnersList = createWinnersList(store);

    container.append(
      menuElement,
      titleContainer,
      paginationControls,
      winnersList
    );
  };

  render(store.getState());

  return container;
}
