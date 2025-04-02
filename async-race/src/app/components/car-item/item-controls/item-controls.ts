import { createButton } from '~/app/components/button/button';
import { BUTTON_TEXT_CONTENT, EVENT_NAME } from '~/app/constants/constants';
import { deleteCar } from '~/app/services/api/async-race-api';
import { div } from '~/app/utils/create-element';

import styles from './item-controls.module.css';

export function createItemControls(
  trackItem: HTMLLIElement,
  id: number
): { buttonsContainer: HTMLElement; removeListeners: () => void } {
  const startButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.START,
  });

  const returnButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.RETURN,
  });

  const deleteButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.DELETE,
  });

  const editButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.EDIT,
  });

  const startHandler = (): void => {
    console.log(`start ${String(id)}`);
  };

  const returnHandler = (): void => {
    console.log(`return ${String(id)}`);
  };

  const deleteHandler = (): void => {
    console.log('delete');
    deleteCar(id)
      .then(() => {
        trackItem.remove();
      })
      .catch((error: unknown) => {
        console.error('Error deleting car:', error);
      });
  };

  const editHandler = (): void => {
    console.log(`edit ${String(id)}`);
  };

  startButton.addEventListener(EVENT_NAME.CLICK, startHandler);
  returnButton.addEventListener(EVENT_NAME.CLICK, returnHandler);
  deleteButton.addEventListener(EVENT_NAME.CLICK, deleteHandler);
  editButton.addEventListener(EVENT_NAME.CLICK, editHandler);

  const removeListeners = (): void => {
    startButton.removeEventListener(EVENT_NAME.CLICK, startHandler);
    returnButton.removeEventListener(EVENT_NAME.CLICK, returnHandler);
    deleteButton.removeEventListener(EVENT_NAME.CLICK, deleteHandler);
    editButton.removeEventListener(EVENT_NAME.CLICK, editHandler);
  };

  const buttonsContainer = div({ className: styles.container });
  buttonsContainer.append(startButton, returnButton, deleteButton, editButton);

  return { buttonsContainer, removeListeners };
}
