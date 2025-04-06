import type { RaceService } from '~/app/services/race/race-service';
import type { Store } from '~/app/types/interfaces';

import { generateCars } from '~/app/pages/garage/utils/generate-cars';
import { div } from '~/app/utils/create-element';

import { createButton } from '../button/button';
import styles from './race-controls.module.css';

export function createRaceControls(
  store: Store,
  raceService: RaceService
): HTMLElement {
  const container = div({ className: styles.container });

  const generateCarsButton = createButton({
    textContent: 'Generate cars',
    onClick: (): void => {
      void generateCars(store);
    },
  });

  const raceButton = createButton({
    textContent: 'Start Race',
    onClick: () => {
      raceService.race();
    },
  });

  const resetButton = createButton({
    textContent: 'Reset',
    onClick: () => {
      raceService.reset();
    },
  });

  container.append(generateCarsButton, raceButton, resetButton);

  return container;
}
