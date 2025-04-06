import type { CarItemProperties } from '~/app/types/interfaces';

import { createButton } from '~/app/components/button/button';
import { BUTTON_TEXT } from '~/app/constants/constants';
import { div } from '~/app/utils/create-element';

import type { CarItemController } from '../controllers/car-item-controller';

import { createSettingsForm } from '../../car-settings-form/car-settings-form';
import { createModal } from '../../modal/modal';
import styles from './item-controls.module.css';

export function createItemControls(
  properties: CarItemProperties,
  controller: CarItemController
): HTMLElement {
  const { name, color } = properties;

  const startButton = createButton({
    textContent: BUTTON_TEXT.START,
    onClick: () => {
      startHandler();
    },
  });

  const returnButton = createButton({
    textContent: BUTTON_TEXT.RETURN,
    onClick: () => {
      returnHandler();
    },
  });

  returnButton.disabled = true;

  const deleteButton = createButton({
    textContent: BUTTON_TEXT.DELETE,
    onClick: () => {
      controller.removeCar();
    },
  });

  const editButton = createEditButton(controller.updateCar, name, color);

  const startHandler = (): void => {
    startButton.disabled = true;
    returnButton.disabled = false;

    controller.startCar();
  };

  const returnHandler = (): void => {
    startButton.disabled = false;
    returnButton.disabled = true;

    controller.returnCar();
  };

  const buttonsContainer = div({ className: styles.container });
  buttonsContainer.append(startButton, returnButton, deleteButton, editButton);

  return buttonsContainer;
}

function createEditButton(
  updateHandler: (newName: string, newColor: string) => void,
  name: string,
  color: string
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

      const modalWindow = createModal(settingsForm);

      document.body.prepend(modalWindow);

      modalWindow.showModal();
    },
  });
}
