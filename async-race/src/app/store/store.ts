import type { State, Store } from '../types/interfaces';
import type { Listener } from '../types/types';

import {
  DEFAULT_COLOR,
  DEFAULT_PAGE,
  EMPTY_COUNT,
  EMPTY_STRING,
} from '../constants/constants';
import { getCars } from '../services/api/async-race-api';
import { EventType } from '../types/enums';
import { EventEmitter } from '../utils/event-emitter';

export function createStore(initialState: State): Store {
  const state = { ...initialState };
  const eventBus = new EventEmitter();

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

    subscribe: (event: string, callback: Listener): void => {
      eventBus.subscribe(event, callback);
    },
  };
}

const defaultState: State = {
  currentPage: DEFAULT_PAGE,
  carsCount: EMPTY_COUNT,

  inputName: EMPTY_STRING,
  inputColor: DEFAULT_COLOR,
};

async function initializeCarCount(): Promise<void> {
  const { totalCount } = await getCars(DEFAULT_PAGE);
  defaultState.carsCount = totalCount;
}

await initializeCarCount();

export const store = createStore(defaultState);
