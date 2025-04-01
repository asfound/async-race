import { CAR_ICON_SIZE } from '~/app/constants/constants';
import { div, li } from '~/app/utils/create-element';
import { createSVGElement } from '~/app/utils/create-svg-icon';
import { getRandomColor } from '~/app/utils/get-random-color';
import carSVG from '~/assets/icons/car.svg?raw';

import { createItemControls } from './item-controls/item-controls';

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
