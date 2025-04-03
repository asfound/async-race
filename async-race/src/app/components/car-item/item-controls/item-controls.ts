import { createButton } from '~/app/components/button/button';
import {
  BUTTON_TEXT_CONTENT,
  DEFAULT_INCREMENT,
  DEFAULT_PAGE,
} from '~/app/constants/constants';
import { deleteCar } from '~/app/services/api/async-race-api';
import { store } from '~/app/store/store';
import { isExceeding } from '~/app/utils/check-page';
import { div } from '~/app/utils/create-element';

import styles from './item-controls.module.css';

export function createItemControls(
  trackItem: HTMLLIElement,
  id: number
): HTMLElement {
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
    deleteCar(id)
      .then(() => {
        const { currentPage, carsCount: currentCount } = store.getState();

        const updatedCount = currentCount - DEFAULT_INCREMENT;

        store.setCount({ carsCount: updatedCount });

        const updatedPage = isExceeding(currentPage, updatedCount)
          ? currentPage - DEFAULT_INCREMENT || DEFAULT_PAGE
          : currentPage;

        store.setPage({ currentPage: updatedPage });

        trackItem.remove();
      })
      .catch((error: unknown) => {
        console.error('Error deleting car:', error);
      });
  };

  const editHandler = (): void => {
    console.log(`edit ${String(id)}`);
  };

  startButton.addEventListener('click', startHandler);
  returnButton.addEventListener('click', returnHandler);
  deleteButton.addEventListener('click', deleteHandler);
  editButton.addEventListener('click', editHandler);

  const buttonsContainer = div({ className: styles.container });
  buttonsContainer.append(startButton, returnButton, deleteButton, editButton);

  return buttonsContainer;
}
