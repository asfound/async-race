import { createButton } from '~/app/components/button/button';
import { BUTTON_TEXT_CONTENT } from '~/app/constants/constants';
import { deleteCar } from '~/app/services/api/async-race-api';
import { div } from '~/app/utils/create-element';

import styles from './item-controls.module.css';

export function createItemControls(
  trackItem: HTMLLIElement,
  abortController: AbortController,
  signal: AbortSignal,
  id: number
): HTMLElement {
  const buttons = [
    {
      text: BUTTON_TEXT_CONTENT.START,
      action: (): void => {
        console.log('start');
      },
    },
    {
      text: BUTTON_TEXT_CONTENT.RETURN,
      action: (): void => {
        console.log('return');
      },
    },
    {
      text: BUTTON_TEXT_CONTENT.EDIT,
      action: (): void => {
        console.log('edit');
      },
    },
    {
      text: BUTTON_TEXT_CONTENT.DELETE,
      action: (): void => {
        console.log('delete');
        deleteCar(id)
          .then(() => {
            abortController.abort();
            trackItem.remove();
          })
          .catch((error: unknown) => {
            console.error('Error deleting car:', error);
          });
      },
    },
  ].map(({ text, action }) =>
    createButton({ textContent: text, onClick: action, signal })
  );

  return div({ className: styles.container }, buttons);
}
