import type { CarItemController } from '~/app/components/car-item/controllers/car-item-controller';
import type { Store } from '~/app/types/interfaces';

import { MILLISECONDS, TIME_PRECISION } from '~/app/constants/constants';
import { GarageStatus } from '~/app/types/enums';
import { p } from '~/app/utils/create-element';
import { showErrorModal, showModal } from '~/app/utils/show-modal';

import { winnersService } from '../winners/winners-service';

export class RaceService {
  public controllers = new Map<number, CarItemController>();

  private readonly store: Store;

  constructor(store: Store) {
    this.store = store;
  }

  public addController(controller: CarItemController): void {
    this.controllers.set(controller.id, controller);
  }

  public removeController(id: number): void {
    this.controllers.delete(id);
  }

  public clearControllers(): void {
    this.controllers.clear();
  }

  public race(): void {
    this.store.updateGarageStatus(GarageStatus.RACING);

    const promises = [...this.controllers.values()].map((controller) => {
      return controller.startCar(true).then(() => controller.properties);
    });

    const startTime = new Date();

    Promise.any(promises)
      .then((properties) => {
        const endTime = new Date();

        const time = (endTime.getTime() - startTime.getTime()) / MILLISECONDS;

        const message = `${properties.name} won in ${String(time.toFixed(TIME_PRECISION))} seconds`;
        showModal(p({}, [message]));

        winnersService.registerWinner(properties.id, time);
      })
      .catch((error: unknown) => {
        if (!(error instanceof AggregateError)) {
          showErrorModal(error);
        }
      });

    void Promise.allSettled(promises).finally(() => {
      this.store.updateGarageStatus(GarageStatus.CARS_LEFT);
    });
  }

  public resetOnPageChange(): void {
    this.store.updateGarageStatus(GarageStatus.READY);
  }

  public reset(): void {
    const promises = [...this.controllers.values()].map((controller) => {
      return controller.returnCar();
    });

    Promise.allSettled(promises)
      .then(() => {
        this.store.updateGarageStatus(GarageStatus.READY);
      })
      .catch(showErrorModal);
  }
}
