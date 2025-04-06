import type { CarService } from '~/app/services/car/car-service';
import type { RaceService } from '~/app/services/race/race-service';
import type { CarItemProperties, Store } from '~/app/types/interfaces';

import { CAR_ICON_SIZE } from '~/app/constants/constants';
import { CarEventType } from '~/app/types/enums';
import { div, li, p } from '~/app/utils/create-element';

import { createCarIcon } from './car-icon/car-icon';
import styles from './car-item.module.css';
import {
  CarStatus,
  createCarStore,
  type CarState,
} from './car-store/car-store';
import { createAnimationController } from './controllers/animation-controller';
import { CarItemController } from './controllers/car-item-controller';
import { createItemControls } from './item-controls/item-controls';

export function createCarItem(
  properties: CarItemProperties,
  carService: CarService,
  raceService: RaceService,
  store: Store
): HTMLLIElement {
  const trackItem = li({ className: styles.item });

  const getWidth = (): number => {
    return trackItem.offsetWidth - Number(CAR_ICON_SIZE.WIDTH);
  };

  const carStore = createCarStore({
    currentStatus: CarStatus.ON_START,
    properties,
  });

  const render = (state: CarState): void => {
    const { id, name } = state.properties;

    raceService.removeController(id);

    trackItem.replaceChildren();

    const carIcon = createCarIcon(carStore);

    const animationController = createAnimationController(carIcon, getWidth);

    const itemController = new CarItemController(
      properties,
      trackItem,
      carService,
      animationController,
      carStore,
      store
    );

    raceService.addController(itemController);

    const buttonsContainer = createItemControls(
      itemController,
      raceService,
      carStore
    );

    const carName = p({ textContent: name, className: styles.name });

    const carTrack = div({ className: styles.track }, [carIcon]);

    trackItem.append(buttonsContainer, carName, carTrack);
  };

  render(carStore.getState());

  carStore.subscribe(CarEventType.PROPERTIES_CHANGE, render);

  return trackItem;
}
