import type { CarItemProperties } from '~/app/types/interfaces';

import { createButton } from '~/app/components/button/button';
import { BUTTON_TEXT, HTTP_STATUS } from '~/app/constants/constants';
import { driveCar, startCar, stopCar } from '~/app/services/api/api-service';
import { div } from '~/app/utils/create-element';
import { EngineError } from '~/app/utils/custom-errors';
import { showErrorModal } from '~/app/utils/show-error-modal';

import type { CarAnimationController } from '../controllers/animation-controller';
import type { CarItemController } from '../controllers/car-item-controller';

import { createSettingsForm } from '../../car-settings-form/car-settings-form';
import { createModal } from '../../modal/modal';
import styles from './item-controls.module.css';

export function createItemControls(
  properties: CarItemProperties,
  animationController: CarAnimationController,
  callback: () => void,
  controller: CarItemController
): HTMLElement {
  const { id, name, color } = properties;

  const startButton = createButton({
    textContent: BUTTON_TEXT.START,
  });

  const returnButton = createButton({
    textContent: BUTTON_TEXT.RETURN,
  });

  returnButton.disabled = true;

  const deleteButton = createButton({
    textContent: BUTTON_TEXT.DELETE,
    onClick: () => {
      controller.removeCar(id);
    },
  });

  const editButton = createEditButton(controller.updateCar, name, color);

  const startHandler = (): void => {
    startButton.disabled = true;
    returnButton.disabled = false;

    startCar(id)
      .then((response) => {
        const { velocity, distance } = response;
        return distance / velocity;
      })
      .then((duration) => {
        animationController.drive(duration);
        return driveCar(id);
      })
      .catch((error: unknown) => {
        if (
          error instanceof EngineError &&
          error.statusCode === HTTP_STATUS.INTERNAL_SERVER_ERROR
        ) {
          animationController.pause();
          callback();
        } else {
          showErrorModal(error);
        }
      });
  };

  const returnHandler = (): void => {
    startButton.disabled = false;
    returnButton.disabled = true;

    animationController.stop();

    void stopCar(id);
  };

  startButton.addEventListener('click', startHandler);
  returnButton.addEventListener('click', returnHandler);

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
