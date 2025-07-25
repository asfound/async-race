import type { RaceService } from '~/app/services/race/race-service';
import type {
  CarState,
  CarStore,
  ControlsState,
  State,
  Store,
} from '~/app/types/interfaces';

import { createButton } from '~/app/components/button/button';
import { BUTTON_TEXT } from '~/app/constants/constants';
import {
  CarEventType,
  CarStatus,
  EventType,
  GarageStatus,
} from '~/app/types/enums';
import { div } from '~/app/utils/create-element';
import { showErrorModal, showModal } from '~/app/utils/show-modal';

import type { CarItemController } from '../controllers/car-item-controller';

import { createSettingsForm } from '../../car-settings-form/car-settings-form';
import styles from './item-controls.module.css';

export function createItemControls(
  controller: CarItemController,
  raceService: RaceService,
  carStore: CarStore,
  store: Store
): HTMLElement {
  const buttonsContainer = div({ className: styles.container });

  const render = (state: State, carState: CarState): void => {
    buttonsContainer.replaceChildren();

    const { name, color } = carState.properties;

    const currentStatus = carState.currentStatus;

    const controlsState = convertToControlsState(
      currentStatus,
      state.garageStatus
    );

    const startButton = createStartButton(controller, controlsState);

    const returnButton = createReturnButton(controller, controlsState);

    buttonsContainer.append(startButton, returnButton);

    const deleteButton = createDelete(controller, controlsState, raceService);

    const editButton = createEditButton(
      (newName, newColor) => {
        controller.updateCar(newName, newColor);
      },
      name,
      color,
      controlsState
    );

    buttonsContainer.append(deleteButton, editButton);
  };

  render(store.getState(), carStore.getState());

  carStore.subscribe(CarEventType.STATUS_CHANGE, (carState) => {
    render(store.getState(), carState);
  });

  store.subscribe(EventType.GARAGE_STATUS_CHANGE, (state) => {
    render(state, carStore.getState());
  });

  return buttonsContainer;
}

function createStartButton(
  controller: CarItemController,
  controlsState: ControlsState
): HTMLButtonElement {
  return createButton({
    textContent: BUTTON_TEXT.START,
    onClick: () => {
      controller.startCar(false).catch((error: unknown) => {
        if (!(error instanceof DOMException)) {
          showErrorModal(error);
        }
      });
    },
    disabled: controlsState.isStartDisabled,
  });
}

function createReturnButton(
  controller: CarItemController,
  controlsState: ControlsState
): HTMLButtonElement {
  return createButton({
    textContent: BUTTON_TEXT.RETURN,
    onClick: () => {
      void controller.returnCar();
    },
    disabled: controlsState.isReturnDisabled,
  });
}

function createDelete(
  controller: CarItemController,
  controlsState: ControlsState,
  raceService: RaceService
): HTMLButtonElement {
  return createButton({
    textContent: BUTTON_TEXT.DELETE,
    onClick: () => {
      controller.removeCar();
      raceService.removeController(controller.id);
    },
    disabled: controlsState.isDeleteDisabled,
  });
}

function createEditButton(
  updateHandler: (newName: string, newColor: string) => void,
  name: string,
  color: string,
  controlsState: ControlsState
): HTMLButtonElement {
  return createButton({
    textContent: BUTTON_TEXT.EDIT,

    onClick: (): void => {
      const settingsForm = createSettingsForm(
        BUTTON_TEXT.SAVE,
        updateHandler,
        name,
        color
      );

      showModal(settingsForm);
    },
    disabled: controlsState.isDeleteDisabled,
  });
}

const AllControlsDisabled = {
  isStartDisabled: true,
  isReturnDisabled: true,
  isEditDisabled: true,
  isDeleteDisabled: true,
};

function convertToControlsState(
  status: CarStatus,
  garageStatus: GarageStatus
): ControlsState {
  if (garageStatus === GarageStatus.RACING) {
    return AllControlsDisabled;
  }

  switch (status) {
    case CarStatus.RACING: {
      return {
        isStartDisabled: true,
        isReturnDisabled: true,
        isEditDisabled: true,
        isDeleteDisabled: true,
      };
    }
    case CarStatus.DRIVING:
    case CarStatus.FINISHED:
    case CarStatus.ENGINE_BROKEN: {
      return {
        isStartDisabled: true,
        isReturnDisabled: false,
        isEditDisabled: false,
        isDeleteDisabled: false,
      };
    }

    case CarStatus.ON_START: {
      return {
        isStartDisabled: false,
        isReturnDisabled: true,
        isEditDisabled: false,
        isDeleteDisabled: false,
      };
    }
  }
}
