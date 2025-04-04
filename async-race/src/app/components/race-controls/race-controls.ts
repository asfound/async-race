import { div } from '~/app/utils/create-element';

import { createButton } from '../button/button';
import styles from './race-controls.module.css';

export function createRaceControls(): HTMLElement {
  const container = div({ className: styles.container });

  const generateCarsButton = createButton({ textContent: 'Generate cars' });

  const raceButton = createButton({ textContent: 'Start Race' });

  const resetButton = createButton({ textContent: 'Reset' });

  container.append(generateCarsButton, raceButton, resetButton);

  return container;
}
