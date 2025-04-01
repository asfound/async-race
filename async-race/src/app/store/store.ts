import type { Listener } from '../utils/event-emitter';

import { EventEmitter } from '../utils/event-emitter';

export interface State {
  currentPage: number;
}

interface Store {
  getState: () => State;
  setState: (newState: Partial<State>) => void;
  subscribe: (event: string, callback: Listener) => void;
}

export function createStore(initialState: State): Store {
  const state = { ...initialState };
  const eventBus = new EventEmitter();

  return {
    getState: (): State => state,

    setState: (newState: Partial<State>): void => {
      Object.assign(state, newState);
      eventBus.emit('stateUpdate', state);
    },

    subscribe: (event: string, callback: Listener): void => {
      eventBus.subscribe(event, callback);
    },
  };
}

const DEFAULT_STATE: State = { currentPage: 1 };

export const store = createStore(DEFAULT_STATE);
