import type { CarService } from '~/app/services/car/car-service';
import type { RaceService } from '~/app/services/race/race-service';
import type { State, Store } from '~/app/types/interfaces';
import type { Render } from '~/app/types/types';

import { generateCars } from '~/app/pages/garage/utils/generate-cars';
import { EventType } from '~/app/types/enums';
import { div } from '~/app/utils/create-element';

import { createButton } from '../button/button';
import styles from './race-controls.module.css';

export enum GarageStatus {
  RACING,
  READY,
  CARS_LEFT,
}
interface RaceControlsState {
  isGenerateDisabled: boolean;
  isRaceDisabled: boolean;
  isResetDisabled: boolean;
}

export function createRaceControls(
  store: Store,
  carService: CarService,
  raceService: RaceService
): HTMLElement {
  const container = div({ className: styles.container });

  const render: Render = (state: State) => {
    container.replaceChildren();

    const { garageStatus } = state;

    const controlsState = convertToControlsState(garageStatus);
    console.log('redner race controls', controlsState);

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
      disabled: controlsState.isRaceDisabled,
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
