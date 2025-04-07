import type { State, Store } from '../types/interfaces';
import type { Listener } from '../types/types';

import {
  DEFAULT_COLOR,
  DEFAULT_PAGE,
  EMPTY_COUNT,
  EMPTY_STRING,
} from '../constants/constants';
import { Route } from '../router/route';
import { EventType, GarageStatus, SortField, SortOrder } from '../types/enums';
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

    setWinnersPage: (newState: Partial<State>): void => {
      Object.assign(state, newState);
      eventBus.emit(EventType.WINNERS_PAGE_CHANGE, state);
    },

    setCount: (newState: Partial<State>): void => {
      Object.assign(state, newState);
      eventBus.emit(EventType.COUNT_CHANGE, state);
    },

    updateState: (newState: Partial<State>): void => {
      Object.assign(state, newState);
    },

    updateGarageStatus: (newStatus: GarageStatus): void => {
      state.garageStatus = newStatus;
      eventBus.emit(EventType.GARAGE_STATUS_CHANGE, state);
    },

    setAppPage: (route: Route): void => {
      if (route === Route.GARAGE || route === Route.WINNERS) {
        state.currentAppPage = route;
        eventBus.emit(EventType.APP_PAGE_CHANGE, state);
      }
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

  currentWinnersPage: DEFAULT_PAGE,
  winnersCount: EMPTY_COUNT,

  winnersOnCurrentPage: [],
  winnersCars: [],

  sortField: SortField.TIME,
  sortOrder: SortOrder.ASC,

  currentAppPage: Route.GARAGE,
};

export const store = createStore(defaultState);
