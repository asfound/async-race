import { createButton } from '~/app/components/button/button';
import { BUTTON_TEXT_CONTENT } from '~/app/constants/constants';
import { div } from '~/app/utils/create-element';

export function createItemControls(
  trackItem: HTMLLIElement,
  abortController: AbortController,
  signal: AbortSignal
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
        abortController.abort();
        trackItem.remove();
      },
    },
  ].map(({ text, action }) =>
    createButton({ textContent: text, onClick: action, signal })
  );

  return div({}, buttons);
}
