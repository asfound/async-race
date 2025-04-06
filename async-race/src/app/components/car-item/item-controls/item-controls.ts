import type { CarItemProperties } from '~/app/types/interfaces';

import { createButton } from '~/app/components/button/button';
import { BUTTON_TEXT } from '~/app/constants/constants';
import { div } from '~/app/utils/create-element';
import { showErrorModal } from '~/app/utils/show-error-modal';
import { showModal } from '~/app/utils/show-modal';

import type { CarItemController } from '../controllers/car-item-controller';

import { createSettingsForm } from '../../car-settings-form/car-settings-form';
import styles from './item-controls.module.css';

export function createItemControls(
  properties: CarItemProperties,
  controller: CarItemController,
  onEdit: (properties: CarItemProperties) => void
): HTMLElement {
  const buttonsContainer = div({ className: styles.container });

  const { id, name, color } = properties;

  const startButton = createButton({
    textContent: BUTTON_TEXT.START,
    onClick: () => {
      startButton.disabled = true;
      returnButton.disabled = false;

      controller.startCar();
    },
  });

  const returnButton = createButton({
    textContent: BUTTON_TEXT.RETURN,
    onClick: () => {
      startButton.disabled = false;
      returnButton.disabled = true;

      controller.returnCar();
    },
    disabled: true,
  });

  const deleteButton = createButton({
    textContent: BUTTON_TEXT.DELETE,
    onClick: () => {
      controller.removeCar();
    },
  });

  const editButton = createEditButton(
    (newName, newColor) => {
      controller
        .updateCar(newName, newColor)
        .then(() => {
          onEdit({ id, name: newName, color: newColor });
        })
        .catch(showErrorModal);
    },
    name,
    color
  );

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

      showModal(settingsForm);
    },
  });
}
