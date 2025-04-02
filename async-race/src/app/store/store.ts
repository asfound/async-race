import type { Listener } from '../utils/event-emitter';

import { DEFAULT_NUMBER_VALUE } from '../constants/constants';
import { getCars } from '../services/api/async-race-api';
import { EventEmitter } from '../utils/event-emitter';

export enum EventType {
  PAGE_CHANGE = 'pageChange',
  COUNT_CHANGE = 'countChange',
}

export interface State {
  currentPage: number;
  carsCount: number;
}

export interface Store {
  getState: () => State;
  setPage: (newState: Partial<State>) => void;
  setCount: (newState: Partial<State>) => void;
  subscribe: (event: string, callback: Listener) => void;
}

export function createStore(initialState: State): Store {
  const state = { ...initialState };
  const eventBus = new EventEmitter();

  return {
    getState: (): State => state,

    setPage: (newState: Partial<State>): void => {
      Object.assign(state, newState);
      eventBus.emit(EventType.PAGE_CHANGE, newState);
    },

    setCount: (newState: Partial<State>): void => {
      Object.assign(state, newState);
      eventBus.emit(EventType.COUNT_CHANGE, state);
    },

    subscribe: (event: string, callback: Listener): void => {
      eventBus.subscribe(event, callback);
    },
  };
}

export const DEFAULT_PAGE = 1;

const DEFAULT_STATE: State = {
  currentPage: DEFAULT_PAGE,
  carsCount: DEFAULT_NUMBER_VALUE,
};

async function initializeCarCount(): Promise<void> {
  const { totalCount } = await getCars(DEFAULT_PAGE);
  DEFAULT_STATE.carsCount = totalCount;
}

await initializeCarCount();

export const store = createStore(DEFAULT_STATE);
