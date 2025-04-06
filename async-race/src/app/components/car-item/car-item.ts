import type { CarService } from '~/app/services/car/car-service';
import type { RaceService } from '~/app/services/race/race-service';
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
  carService: CarService,
  raceService: RaceService
): HTMLLIElement {
  const trackItem = li({ className: styles.item });

  const getWidth = (): number => {
    return trackItem.offsetWidth - Number(CAR_ICON_SIZE.WIDTH);
  };

  const render = (properties: CarItemProperties): void => {
    const { id, name, color } = properties;

    raceService.removeController(id);

    trackItem.replaceChildren();

    const { carIcon, actions } = createCarIcon(color);

    const animationController = createAnimationController(carIcon, getWidth);

    const itemController = new CarItemController(
      properties,
      trackItem,
      carService,
      animationController,
      actions
    );

    raceService.addController(itemController);

    const buttonsContainer = createItemControls(
      properties,
      itemController,
      render,
      raceService
    );

    const carName = p({ textContent: name, className: styles.name });

    const carTrack = div({ className: styles.track }, [carIcon]);

    trackItem.append(buttonsContainer, carName, carTrack);
  };

  render(properties);

  return trackItem;
}
