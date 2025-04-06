import type { RaceService } from '~/app/services/race/race-service';

import { createButton } from '~/app/components/button/button';
import { BUTTON_TEXT } from '~/app/constants/constants';
import { CarEventType } from '~/app/types/enums';
import { div } from '~/app/utils/create-element';
import { showErrorModal, showModal } from '~/app/utils/show-modal';

import type { CarItemController } from '../controllers/car-item-controller';

import { createSettingsForm } from '../../car-settings-form/car-settings-form';
import {
  CarStatus,
  type CarState,
  type CarStore,
} from '../car-store/car-store';
import styles from './item-controls.module.css';

interface ControlsState {
  isStartDisabled: boolean;
  isReturnDisabled: boolean;
  isEditDisabled: boolean;
  isDeleteDisabled: boolean;
}

export function createItemControls(
  controller: CarItemController,
  raceService: RaceService,
  carStore: CarStore
): HTMLElement {
  const buttonsContainer = div({ className: styles.container });

  const render = (carState: CarState): void => {
    buttonsContainer.replaceChildren();

    const { name, color } = carState.properties;

    const currentStatus = carState.currentStatus;

    const controlsState = convertToControlsState(currentStatus);

    const startButton = createButton({
      textContent: BUTTON_TEXT.START,
      onClick: () => {
        controller.startCar(false).catch(showErrorModal);
      },
      disabled: controlsState.isStartDisabled,
    });

    const returnButton = createButton({
      textContent: BUTTON_TEXT.RETURN,
      onClick: () => {
        controller.returnCar();
      },
      disabled: controlsState.isReturnDisabled,
    });

    const deleteButton = createButton({
      textContent: BUTTON_TEXT.DELETE,
      onClick: () => {
        controller.removeCar();
        raceService.removeController(controller.id);
      },
      disabled: controlsState.isDeleteDisabled,
    });

    const editButton = createEditButton(
      (newName, newColor) => {
        controller.updateCar(newName, newColor);
      },
      name,
      color,
      controlsState
    );

    buttonsContainer.append(
      startButton,
      returnButton,
      deleteButton,
      editButton
    );
  };

  render(carStore.getState());
  carStore.subscribe(CarEventType.STATUS_CHANGE, render);

  return buttonsContainer;
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

function convertToControlsState(status: CarStatus): ControlsState {
  switch (status) {
    case CarStatus.RACING: {
      return {
        isStartDisabled: true,
        isReturnDisabled: true,
        isEditDisabled: true,
        isDeleteDisabled: true,
      };
    }
    case CarStatus.FINISHED:
    case CarStatus.ENGINE_BROKEN: {
      return {
        isStartDisabled: true,
        isReturnDisabled: false,
        isEditDisabled: false,
        isDeleteDisabled: false,
      };
    }

    case CarStatus.DRIVING: {
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
