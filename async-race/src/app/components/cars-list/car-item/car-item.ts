import { BUTTON_TEXT_CONTENT, CAR_ICON_SIZE } from '~/app/constants/constants';
import { div, li } from '~/app/utils/create-element';
import { createSVGElement } from '~/app/utils/create-svg-icon';
import { getRandomColor } from '~/app/utils/get-random-color';
import car from '~/assets/icons/car.svg?raw';

import { createButton } from '../../button/button';

export function createCarItem(): HTMLLIElement {
  const trackItem = li({});
  const abortController = new AbortController();
  const { signal } = abortController;

  const startButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.START,
    onClick: () => {
      console.log('start');
    },
    signal,
  });

  const returnButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.RETURN,
    onClick: () => {
      console.log('return');
    },
    signal,
  });

  const deleteButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.DELETE,
    onClick: () => {
      console.log('delete');
      abortController.abort();
      trackItem.remove();
    },
    signal,
  });

  const buttonsContainer = div({}, [startButton, returnButton, deleteButton]);

  const carIcon = createSVGElement(
    car,
    getRandomColor(),
    CAR_ICON_SIZE.WIDTH,
    CAR_ICON_SIZE.HEIGHT
  );

  const carTrack = div({}, [carIcon]);

  trackItem.append(buttonsContainer, carTrack);
  return trackItem;
}
