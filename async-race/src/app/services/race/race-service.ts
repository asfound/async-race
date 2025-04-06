import type { CarItemController } from '~/app/components/car-item/controllers/car-item-controller';

import { p } from '~/app/utils/create-element';
import { showErrorModal } from '~/app/utils/show-error-modal';
import { showModal } from '~/app/utils/show-modal';

export interface RaceService {
  addController: (controller: CarItemController) => void;

  removeController: (id: number) => void;

  clearControllers: () => void;

  race: () => void;
}

export function createRaceService(): RaceService {
  const controllers = new Map<number, CarItemController>();

  const addController = (controller: CarItemController): void => {
    controllers.set(controller.id, controller);
  };

  const removeController = (id: number): void => {
    controllers.delete(id);
  };

  const clearControllers = (): void => {
    controllers.clear();
  };

  const race = (): void => {
    const promises = [...controllers.values()].map((controller) => {
      return controller.startCar(true).then(() => controller.properties.name);
    });

    Promise.any(promises)
      .then((name) => {
        const message = `${name} won in x seconds`;
        showModal(p({}, [message]));
      })
      .catch(showErrorModal);
  };

  return {
    addController,
    removeController,
    clearControllers,
    race,
  };
}
