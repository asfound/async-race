import type { Store } from '~/app/types/interfaces';

import { generateCars } from '~/app/pages/garage/utils/generate-cars';
import { div } from '~/app/utils/create-element';

import { createButton } from '../button/button';
import styles from './race-controls.module.css';

export function createRaceControls(store: Store): HTMLElement {
  const container = div({ className: styles.container });

  const generateCarsButton = createButton({
    textContent: 'Generate cars',
    onClick: (): void => {
      generateCars(store).catch(() => {
        console.error('Error during car creation');
      });
    },
  });

  const raceButton = createButton({ textContent: 'Start Race' });

  const resetButton = createButton({ textContent: 'Reset' });

  container.append(generateCarsButton, raceButton, resetButton);

  return container;
}
