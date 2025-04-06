import type { State, Store } from '../types/interfaces';
import type { Listener } from '../types/types';

import { GarageStatus } from '../components/race-controls/race-controls';
import {
  DEFAULT_COLOR,
  DEFAULT_PAGE,
  EMPTY_COUNT,
  EMPTY_STRING,
} from '../constants/constants';
import { EventType } from '../types/enums';
import { EventEmitter } from '../utils/event-emitter';

export function createStore(initialState: State): Store {
  const state = { ...initialState };
  const eventBus = new EventEmitter<State, EventType>();

  return {
    getState: (): State => state,

    setPage: (newState: Partial<State>): void => {
      Object.assign(state, newState);
      eventBus.emit(EventType.PAGE_CHANGE, state);
    },

    setCount: (newState: Partial<State>): void => {
      Object.assign(state, newState);
      eventBus.emit(EventType.COUNT_CHANGE, state);
    },

    setName: (newState: Partial<State>): void => {
      Object.assign(state, newState);
    },

    setColor: (newState: Partial<State>): void => {
      Object.assign(state, newState);
    },

    updateState: (newState: Partial<State>): void => {
      Object.assign(state, newState);
    },

    updateGarageStatus: (newStatus: GarageStatus): void => {
      state.garageStatus = newStatus;
      eventBus.emit(EventType.GARAGE_STATUS_CHANGE, state);
    },

    subscribe: (event: EventType, callback: Listener<State>): void => {
      eventBus.subscribe(event, callback);
    },
  };
}

const defaultState: State = {
  currentPage: DEFAULT_PAGE,
  carsCount: EMPTY_COUNT,

  nameInputValue: EMPTY_STRING,
  colorInputValue: DEFAULT_COLOR,

  carsOnCurrentPage: [],

  garageStatus: GarageStatus.READY,
};

export const store = createStore(defaultState);
