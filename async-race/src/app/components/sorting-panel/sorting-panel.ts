import type { Store } from '~/app/types/interfaces';
import type { Render } from '~/app/types/types';

import { DEFAULT_PAGE } from '~/app/constants/constants';
import { winnersService } from '~/app/services/winners/winners-service';
import { SortField, SortOrder } from '~/app/types/enums';
import { div } from '~/app/utils/create-element';

import { createButton } from '../button/button';
import styles from './sorting-panel.module.css';

const ORDER_BUTTON_TEXT = {
  ASC: '↑',
  DESC: '↓',
};

export function createSortingPanel(store: Store): HTMLElement {
  const container = div({ className: styles.container });

  const render: Render = ({ sortField, sortOrder }) => {
    container.replaceChildren();

    const timeButton = createButton({
      textContent: 'Time',
      onClick: () => {
        winnersService.setWinners(
          store,
          DEFAULT_PAGE,
          SortField.TIME,
          sortOrder
        );
      },
      disabled: sortField === SortField.TIME,
    });

    const idButton = createButton({
      textContent: 'ID',
      onClick: () => {
        winnersService.setWinners(store, DEFAULT_PAGE, SortField.ID, sortOrder);
      },
      disabled: sortField === SortField.ID,
    });

    const winsButton = createButton({
      textContent: 'Wins',
      onClick: () => {
        winnersService.setWinners(
          store,
          DEFAULT_PAGE,
          SortField.WINS,
          sortOrder
        );
      },
      disabled: sortField === SortField.WINS,
    });

    const orderButton = createButton({
      textContent: ORDER_BUTTON_TEXT[sortOrder],
      onClick: () => {
        const newSortOrder =
          sortOrder === SortOrder.ASC ? SortOrder.DESC : SortOrder.ASC;

        winnersService.setWinners(store, DEFAULT_PAGE, sortField, newSortOrder);
      },
    });

    container.append(timeButton, idButton, winsButton, orderButton);
  };

  render(store.getState());

  return container;
}
