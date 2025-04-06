import type { CarService } from '~/app/services/car/car-service';
import type { CarItemProperties } from '~/app/types/interfaces';

import { CAR_ICON_SIZE } from '~/app/constants/constants';
import { div, li, p } from '~/app/utils/create-element';

import { createCarIcon } from './car-icon/car-icon';
import styles from './car-item.module.css';
import { createAnimationController } from './controllers/animation-controller';
import { CarItemController } from './controllers/car-item-controller';
import { createItemControls } from './item-controls/item-controls';

export function createCarItem(
  properties: CarItemProperties,
  carService: CarService
): HTMLLIElement {
  const trackItem = li({ className: styles.item });

  const { id, name, color } = properties;

  const { carIcon, actions } = createCarIcon(color);

  const getWidth = (): number => {
    return trackItem.offsetWidth - Number(CAR_ICON_SIZE.WIDTH);
  };

  const animationController = createAnimationController(carIcon, getWidth);

  const itemController = new CarItemController(
    id,
    trackItem,
    carService,
    animationController,
    actions
  );

  const buttonsContainer = createItemControls(properties, itemController);

  const carName = p({ textContent: name, className: styles.name });

  const carTrack = div({ className: styles.track }, [carIcon]);

  trackItem.append(buttonsContainer, carName, carTrack);
  return trackItem;
}
