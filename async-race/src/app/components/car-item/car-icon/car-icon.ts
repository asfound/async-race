import { CAR_ICON_SIZE, REPAIR_ICON_SIZE } from '~/app/constants/constants';
import { CarEventType } from '~/app/types/enums';
import { div } from '~/app/utils/create-element';
import { createSVGElement } from '~/app/utils/create-svg-icon';
import carSVG from '~/assets/icons/car.svg?raw';
import repairSvg from '~/assets/icons/repair.svg?raw';

import { CarStatus, type CarStore } from '../car-store/car-store';
import styles from './car-icon.module.css';

export function createCarIcon(carStore: CarStore): HTMLElement {
  const carIcon = div({ className: styles.icon });

  const { color } = carStore.getState().properties;

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

  carStore.subscribe(CarEventType.STATUS_CHANGE, (state) => {
    if (state.currentStatus === CarStatus.ENGINE_BROKEN) {
      showAlert();
    }
    if (state.currentStatus === CarStatus.ON_START) {
      hideAlert();
    }
  });

  return carIcon;
}
