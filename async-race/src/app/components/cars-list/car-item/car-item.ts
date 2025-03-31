import { BUTTON_TEXT_CONTENT, CAR_ICON_SIZE } from '~/app/constants/constants';
import { div, li } from '~/app/utils/create-element';
import { createSVGElement } from '~/app/utils/create-svg-icon';
import { getRandomColor } from '~/app/utils/get-random-color';
import carSVG from '~/assets/icons/car.svg?raw';

import { createButton } from '../../button/button';

function createItemControls(
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

export function createCarItem(): HTMLLIElement {
  const trackItem = li({});
  const abortController = new AbortController();
  const { signal } = abortController;

  const buttonsContainer = createItemControls(
    trackItem,
    abortController,
    signal
  );

  const carIcon = createSVGElement(
    carSVG,
    getRandomColor(),
    CAR_ICON_SIZE.WIDTH,
    CAR_ICON_SIZE.HEIGHT
  );

  const carTrack = div({}, [carIcon]);

  trackItem.append(buttonsContainer, carTrack);
  return trackItem;
}
