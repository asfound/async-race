import { CAR_ICON_SIZE, REPAIR_ICON_SIZE } from '~/app/constants/constants';
import { div } from '~/app/utils/create-element';
import { createSVGElement } from '~/app/utils/create-svg-icon';
import carSVG from '~/assets/icons/car.svg?raw';
import repairSvg from '~/assets/icons/repair.svg?raw';

import type { CarItemActions } from '../controllers/car-item-controller';

import styles from './car-icon.module.css';

export function createCarIcon(color: string): {
  carIcon: HTMLElement;
  actions: CarItemActions;
} {
  const carIcon = div({ className: styles.icon });

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

  const showAlert = (): void => {
    repairSvgElement.classList.remove(styles.hidden);
  };

  const hideAlert = (): void => {
    repairSvgElement.classList.add(styles.hidden);
  };

  carIcon.append(carSvgElement, repairSvgElement);

  return { carIcon, actions: { showAlert, hideAlert } };
}
