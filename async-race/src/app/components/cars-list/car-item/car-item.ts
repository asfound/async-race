import type { CarItemProperties } from '~/app/types/interfaces';

import { CAR_ICON_SIZE } from '~/app/constants/constants';
import { div, li, p } from '~/app/utils/create-element';
import { createSVGElement } from '~/app/utils/create-svg-icon';
import carSVG from '~/assets/icons/car.svg?raw';

import { createItemControls } from './item-controls/item-controls';

export function createCarItem({
  id,
  name,
  color,
}: CarItemProperties): HTMLLIElement {
  const trackItem = li({});
  const abortController = new AbortController();
  const { signal } = abortController;

  const buttonsContainer = createItemControls(
    trackItem,
    abortController,
    signal,
    id
  );

  const carName = p({ textContent: name });

  const carIcon = createSVGElement(
    carSVG,
    color,
    CAR_ICON_SIZE.WIDTH,
    CAR_ICON_SIZE.HEIGHT
  );

  const carTrack = div({}, [carIcon]);

  trackItem.append(buttonsContainer, carName, carTrack);
  return trackItem;
}
