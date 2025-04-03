import { COUNTER_TEXT, TITLES } from '~/app/constants/constants';
import { div, h1, p } from '~/app/utils/create-element';

import styles from './garage-title.module.css';

export function createGarageTitle(carsCount: number): {
  titleContainer: HTMLElement;
  updateCounter: (newCount: number) => void;
} {
  const titleContainer = div({ className: styles.container });

  const pageTitle = h1({ textContent: TITLES.GARAGE, className: styles.title });

  const carsCounter = p({
    className: styles.counter,
    textContent: COUNTER_TEXT + String(carsCount),
  });

  const updateCounter = (newCount: number): void => {
    carsCounter.textContent = COUNTER_TEXT + String(newCount);
  };

  titleContainer.append(pageTitle, carsCounter);

  return { titleContainer, updateCounter };
}
