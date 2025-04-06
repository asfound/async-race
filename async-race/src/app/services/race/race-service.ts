import type { CarItemController } from '~/app/components/car-item/controllers/car-item-controller';

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
      .catch(showErrorModal);
  };

  return {
    addController,
    removeController,
    clearControllers,
    race,
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
