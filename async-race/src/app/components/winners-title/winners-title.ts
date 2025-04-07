import type { Store } from '~/app/types/interfaces';
import type { Render } from '~/app/types/types';

import { COUNTER_TEXT, TITLES } from '~/app/constants/constants';
import { div, h1, p } from '~/app/utils/create-element';

import styles from './winners-title.module.css';

export function createWinnersTitle(store: Store): HTMLElement {
  const titleContainer = div({ className: styles.container });

  const render: Render = ({ winnersCount }): void => {
    titleContainer.replaceChildren();

    const pageTitle = h1({
      textContent: TITLES.WINNERS,
      className: styles.title,
    });

    const carsCounter = p({
      className: styles.counter,
      textContent: COUNTER_TEXT.WINNERS + String(winnersCount),
    });

    titleContainer.append(pageTitle, carsCounter);
  };

  render(store.getState());

  return titleContainer;
}
