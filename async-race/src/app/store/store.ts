import type { Listener } from '../utils/event-emitter';

import { EventEmitter } from '../utils/event-emitter';

export enum EventType {
  PAGE_CHANGE = 'pageChange',
}

export interface State {
  currentPage: number;
}

export interface Store {
  getState: () => State;
  setPage: (newState: Partial<State>) => void;
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

    subscribe: (event: string, callback: Listener): void => {
      eventBus.subscribe(event, callback);
    },
  };
}

export const DEFAULT_PAGE = 1;
const DEFAULT_STATE: State = { currentPage: DEFAULT_PAGE };

export const store = createStore(DEFAULT_STATE);
