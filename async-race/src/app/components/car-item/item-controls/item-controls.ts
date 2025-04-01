import { createButton } from '~/app/components/button/button';
import { BUTTON_TEXT_CONTENT } from '~/app/constants/constants';
import { deleteCar } from '~/app/services/api/async-race-api';
import { div } from '~/app/utils/create-element';

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
      action: async (): Promise<void> => {
        console.log('delete');
        await deleteCar(id);
        abortController.abort();
        trackItem.remove();
      },
    },
  ].map(({ text, action }) =>
    createButton({ textContent: text, onClick: action, signal })
  );

  return div({}, buttons);
}
