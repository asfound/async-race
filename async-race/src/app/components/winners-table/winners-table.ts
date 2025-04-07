import type {
  CarItemProperties,
  Store,
  WinnerProperties,
} from '~/app/types/interfaces';
import type { Render } from '~/app/types/types';

import {
  CAR_ICON_SIZE,
  DEFAULT_INCREMENT,
  TIME_PRECISION,
} from '~/app/constants/constants';
import { table, tbody, td, th, thead, tr } from '~/app/utils/create-element';
import { createSVGElement } from '~/app/utils/create-svg-icon';
import carSVG from '~/assets/icons/car.svg?raw';

import styles from './winners-table.module.css';

const TABLE_HEADERS = ['№', 'Car', 'ID', 'Name', 'Wins', 'Best time'];

export function createWinnersTable(
  winners: WinnerProperties[],
  winnersCars: CarItemProperties[],
  store: Store
): HTMLTableElement {
  const tableElement = table({ className: styles.table });

  const render: Render = () => {
    const tableHead = thead({});

    const headerRow = tr({});

    for (const header of TABLE_HEADERS) {
      const thElement = th({ textContent: header });
      headerRow.append(thElement);
    }

    tableHead.append(headerRow);
    tableElement.append(tableHead);

    const tbodyElement = tbody({});

    for (const [index, winner] of winners.entries()) {
      const row = tr({});

      const numberCell = td({});
      numberCell.textContent = `${String(index + DEFAULT_INCREMENT)}.`;
      row.append(numberCell);

      const carCell = td({ className: styles.car });
      const carSvgElement = createSVGElement(
        carSVG,
        winnersCars[index].color,
        CAR_ICON_SIZE.WIDTH,
        CAR_ICON_SIZE.HEIGHT
      );

      carCell.append(carSvgElement);
      row.append(carCell);

      const idCell = td({});
      idCell.textContent = `#${String(winner.id)}`;
      row.append(idCell);

      const nameCell = td({});
      nameCell.textContent = winnersCars[index].name;
      row.append(nameCell);

      const winsCell = td({});
      winsCell.textContent = String(winner.wins);
      row.append(winsCell);

      const bestTimeCell = td({});
      bestTimeCell.textContent = `${winner.time.toFixed(TIME_PRECISION)}s`;
      row.append(bestTimeCell);

      tbodyElement.append(row);
    }

    tableElement.append(tbodyElement);
  };

  render(store.getState());

  return tableElement;
}
