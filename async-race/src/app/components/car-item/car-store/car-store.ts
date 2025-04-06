import type { CarItemProperties } from '~/app/types/interfaces';
import type { Listener } from '~/app/types/types';

import { CarEventType } from '~/app/types/enums';
import { EventEmitter } from '~/app/utils/event-emitter';

export type CarListener = (data: CarState) => void;

export enum CarStatus {
  RACING,
  ON_START,
  FINISHED,
  ENGINE_BROKEN,
}

export interface CarState {
  currentStatus: CarStatus;
  properties: CarItemProperties;
}

export interface CarStore {
  getState: () => CarState;

  setStatus: (newStatus: CarStatus) => void;

  editCar: (newName: string, newColor: string) => void;

  subscribe: (event: CarEventType, callback: CarListener) => void;
}

export function createCarStore(initialState: CarState): CarStore {
  const state = { ...initialState };
  const eventBus = new EventEmitter<CarState, CarEventType>();

  return {
    getState: (): CarState => state,

    setStatus: (newStatus: CarStatus): void => {
      state.currentStatus = newStatus;
      eventBus.emit(CarEventType.STATUS_CHANGE, state);
    },

    editCar: (newName: string, newColor: string): void => {
      state.properties.name = newName;
      state.properties.color = newColor;
      eventBus.emit(CarEventType.PROPERTIES_CHANGE, state);
    },

    subscribe: (event: CarEventType, callback: Listener<CarState>): void => {
      eventBus.subscribe(event, callback);
    },
  };
}
