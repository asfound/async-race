import type { Listener } from './types';

export interface ButtonProperties {
  textContent: string;
  type?: HTMLButtonElement['type'];
  className?: string;
  onClick?: () => void;
}

export interface CarItemProperties {
  id: number;
  name: string;
  color: string;
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
