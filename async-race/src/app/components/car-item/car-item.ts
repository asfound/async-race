import type { CarItemProperties } from '~/app/types/interfaces';

import { CAR_ICON_SIZE } from '~/app/constants/constants';
import { div, li, p } from '~/app/utils/create-element';
import { createSVGElement } from '~/app/utils/create-svg-icon';
import carSVG from '~/assets/icons/car.svg?raw';

import styles from './car-item.module.css';
import { createItemControls } from './item-controls/item-controls';

export function createCarItem({ id, name, color }: CarItemProperties): {
  item: HTMLLIElement;
  removeListeners: () => void;
} {
  const trackItem = li({});

  const { buttonsContainer, removeListeners } = createItemControls(
    trackItem,
    id
  );

  const carName = p({ textContent: name, className: styles.name });

  const carIcon = createSVGElement(
    carSVG,
    color,
    CAR_ICON_SIZE.WIDTH,
    CAR_ICON_SIZE.HEIGHT
  );

  const carTrack = div({}, [carIcon]);

  trackItem.append(buttonsContainer, carName, carTrack);
  return { item: trackItem, removeListeners };
}
