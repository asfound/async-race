import type { CarItemProperties } from '~/app/types/interfaces';

import { createButton } from '~/app/components/button/button';
import {
  BUTTON_TEXT,
  DEFAULT_INCREMENT,
  DEFAULT_PAGE,
} from '~/app/constants/constants';
import {
  deleteCar,
  startCar,
  updateCar,
} from '~/app/services/api/async-race-api';
import { store } from '~/app/store/store';
import { isExceeding } from '~/app/utils/check-page';
import { div } from '~/app/utils/create-element';
import { showErrorModal } from '~/app/utils/show-error-modal';

import type { CarAnimationController } from '../animation-controller';

import { createSettingsForm } from '../../car-settings-form/car-settings-form';
import { createModal } from '../../modal/modal';
import styles from './item-controls.module.css';

export function createItemControls(
  trackItem: HTMLLIElement,
  properties: CarItemProperties,
  animationController: CarAnimationController
): HTMLElement {
  const { id, name, color } = properties;

  const updateHandler = async (
    newName: string,
    newColor: string
  ): Promise<void> => {
    try {
      await updateCar({ id, name: newName, color: newColor });

      const { currentPage } = store.getState();
      store.setPage({ currentPage });
    } catch (error) {
      showErrorModal(error);
    }
  };

  const startButton = createButton({
    textContent: BUTTON_TEXT.START,
  });

  const returnButton = createButton({
    textContent: BUTTON_TEXT.RETURN,
  });

  const deleteButton = createDeleteButton(trackItem, id);

  const editButton = createEditButton(updateHandler, name, color);

  const startHandler = (): void => {
    console.log(
      startCar(id)
        .then((response) => {
          const { velocity } = response;

          animationController.drive(velocity);
        })
        .catch(() => {
          animationController.pause();
        })
    );
  };

  const returnHandler = (): void => {
    console.log(`return ${String(id)}`);
  };

  startButton.addEventListener('click', startHandler);
  returnButton.addEventListener('click', returnHandler);

  const buttonsContainer = div({ className: styles.container });
  buttonsContainer.append(startButton, returnButton, deleteButton, editButton);

  return buttonsContainer;
}

function createDeleteButton(
  trackItem: HTMLLIElement,
  id: number
): HTMLButtonElement {
  const handleDelete = async (): Promise<void> => {
    try {
      await deleteCar(id);

      const { currentPage, carsCount: currentCount } = store.getState();

      const updatedCount = currentCount - DEFAULT_INCREMENT;

      const updatedPage = isExceeding(currentPage, updatedCount)
        ? currentPage - DEFAULT_INCREMENT || DEFAULT_PAGE
        : currentPage;

      store.setPage({ currentPage: updatedPage });
      store.setCount({ carsCount: updatedCount });

      trackItem.remove();
    } catch (error) {
      showErrorModal(error);
    }
  };

  return createButton({
    textContent: BUTTON_TEXT.DELETE,
    onClick: () => void handleDelete(),
  });
}

function createEditButton(
  updateHandler: (newName: string, newColor: string) => Promise<void>,
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
