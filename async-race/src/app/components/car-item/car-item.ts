import type { CarItemProperties } from '~/app/types/interfaces';

import { CAR_ICON_SIZE, REPAIR_ICON_SIZE } from '~/app/constants/constants';
import { div, li, p } from '~/app/utils/create-element';
import { createSVGElement } from '~/app/utils/create-svg-icon';
import carSVG from '~/assets/icons/car.svg?raw';
import repairSvg from '~/assets/icons/repair.svg?raw';

import { createAnimationController } from './animation-controller';
import styles from './car-item.module.css';
import { createItemControls } from './item-controls/item-controls';

export function createCarItem(properties: CarItemProperties): HTMLLIElement {
  const { name, color } = properties;

  const trackItem = li({ className: styles.item });

  const carName = p({ textContent: name, className: styles.name });

  const carSvgElement = createSVGElement(
    carSVG,
    color,
    CAR_ICON_SIZE.WIDTH,
    CAR_ICON_SIZE.HEIGHT
  );

  const repairSvgElement = createSVGElement(
    repairSvg,
    color,
    REPAIR_ICON_SIZE.WIDTH,
    REPAIR_ICON_SIZE.HEIGHT
  );

  repairSvgElement.classList.add(styles.hidden);

  const carIcon = div({ className: styles.icon }, [
    carSvgElement,
    repairSvgElement,
  ]);

  const carTrack = div({ className: styles.track }, [carIcon]);

  const getWidth = (): number => {
    return trackItem.offsetWidth - Number(CAR_ICON_SIZE.WIDTH);
  };

  const onEngineBreak = (): void => {
    repairSvgElement.classList.remove(styles.hidden);
  };

  const animationController = createAnimationController(carIcon, getWidth);

  const buttonsContainer = createItemControls(
    trackItem,
    properties,
    animationController,
    onEngineBreak
  );

  trackItem.append(buttonsContainer, carName, carTrack);
  return trackItem;
}
