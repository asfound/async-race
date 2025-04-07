import type { CarService } from '~/app/services/car/car-service';
import type { RaceService } from '~/app/services/race/race-service';
import type { RaceControlsState, Store } from '~/app/types/interfaces';
import type { Render } from '~/app/types/types';

import { EMPTY_COUNT } from '~/app/constants/constants';
import { generateCars } from '~/app/pages/garage/utils/generate-cars';
import { EventType, GarageStatus } from '~/app/types/enums';
import { div } from '~/app/utils/create-element';

import { createButton } from '../button/button';
import styles from './race-controls.module.css';

export function createRaceControls(
  store: Store,
  carService: CarService,
  raceService: RaceService
): HTMLElement {
  const container = div({ className: styles.container });

  const render: Render = ({ garageStatus, carsCount }) => {
    container.replaceChildren();

    const controlsState = convertToControlsState(garageStatus);

    const generateCarsButton = createButton({
      textContent: 'Generate cars',
      onClick: (): void => {
        void generateCars(carService);
      },
      disabled: controlsState.isGenerateDisabled,
    });

    const raceButton = createButton({
      textContent: 'Start Race',
      onClick: () => {
        raceService.race();
      },
      disabled: controlsState.isRaceDisabled || carsCount === EMPTY_COUNT,
    });

    const resetButton = createButton({
      textContent: 'Reset',
      onClick: () => {
        raceService.reset();
      },
      disabled: controlsState.isResetDisabled,
    });

    container.append(generateCarsButton, raceButton, resetButton);
  };

  render(store.getState());

  store.subscribe(EventType.GARAGE_STATUS_CHANGE, render);
  store.subscribe(EventType.COUNT_CHANGE, render);
  store.subscribe(EventType.PAGE_CHANGE, () => {
    raceService.resetOnPageChange();
  });

  return container;
}

function convertToControlsState(status: GarageStatus): RaceControlsState {
  switch (status) {
    case GarageStatus.READY: {
      return {
        isGenerateDisabled: false,
        isRaceDisabled: false,
        isResetDisabled: true,
      };
    }

    case GarageStatus.CARS_LEFT: {
      return {
        isGenerateDisabled: false,
        isRaceDisabled: true,
        isResetDisabled: false,
      };
    }

    case GarageStatus.RACING: {
      return {
        isGenerateDisabled: true,
        isRaceDisabled: true,
        isResetDisabled: false,
      };
    }
  }
}
