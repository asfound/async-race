import type { Store } from '~/app/types/interfaces';
import type { Render } from '~/app/types/types';

import { COUNTER_TEXT, TITLES } from '~/app/constants/constants';
import { EventType } from '~/app/types/enums';
import { div, h1, p } from '~/app/utils/create-element';

import styles from './garage-title.module.css';

export function createGarageTitle(store: Store): HTMLElement {
  const titleContainer = div({ className: styles.container });

  const render: Render = ({ carsCount }): void => {
    titleContainer.replaceChildren();

    const pageTitle = h1({
      textContent: TITLES.GARAGE,
      className: styles.title,
    });

    const carsCounter = p({
      className: styles.counter,
      textContent: COUNTER_TEXT + String(carsCount),
    });

    titleContainer.append(pageTitle, carsCounter);
  };

  store.subscribe(EventType.COUNT_CHANGE, render);
  render(store.getState());

  return titleContainer;
}
