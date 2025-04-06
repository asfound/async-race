import type { CarItemController } from '~/app/components/car-item/controllers/car-item-controller';
import type { Store } from '~/app/types/interfaces';

import { GarageStatus } from '~/app/components/race-controls/race-controls';
import {
  DEFAULT_INCREMENT,
  MILLISECONDS,
  TIME_PRECISION,
} from '~/app/constants/constants';
import { p } from '~/app/utils/create-element';
import { showErrorModal, showModal } from '~/app/utils/show-modal';

import { apiService } from '../api/api-service';

export interface RaceService {
  addController: (controller: CarItemController) => void;

  removeController: (id: number) => void;

  clearControllers: () => void;

  race: () => void;

  reset: () => void;
}

export function createRaceService(store: Store): RaceService {
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
    store.updateGarageStatus(GarageStatus.RACING);

    const promises = [...controllers.values()].map((controller) => {
      return controller.startCar(true).then(() => controller.properties);
    });

    const startTime = new Date();

    Promise.any(promises)
      .then((properties) => {
        const endTime = new Date();

        const time = (endTime.getTime() - startTime.getTime()) / MILLISECONDS;

        const message = `${properties.name} won in ${String(time.toFixed(TIME_PRECISION))} seconds`;
        showModal(p({}, [message]));

        registerWinner(properties.id, time);
      })
      .catch((error: unknown) => {
        if (!(error instanceof AggregateError)) {
          showErrorModal(error);
        }
      })
      .finally(() => {
        store.updateGarageStatus(GarageStatus.CARS_LEFT);
      });
  };

  const reset = (): void => {
    const promises = [...controllers.values()].map((controller) => {
      return controller.returnCar();
    });

    Promise.allSettled(promises)
      .then(() => {
        store.updateGarageStatus(GarageStatus.READY);
      })
      .catch(showErrorModal);
  };

  return {
    addController,
    removeController,
    clearControllers,
    race,
    reset,
  };
}

function registerWinner(id: number, newTime: number): void {
  apiService.createWinner(id, newTime).catch(() => {
    updateWinner(id, newTime);
  });
}

function updateWinner(id: number, newTime: number): void {
  apiService
    .getWinner(id)
    .then((properties) => {
      const { id, wins, time } = properties;

      const timeToRegister = Math.min(newTime, time);

      return apiService.updateWinner({
        id,
        wins: wins + DEFAULT_INCREMENT,
        time: timeToRegister,
      });
    })
    .catch(showErrorModal);
}
