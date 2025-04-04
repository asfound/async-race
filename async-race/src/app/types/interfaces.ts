import type { CAR_PROPERTIES } from '../constants/constants';
import type { Listener } from './types';

export interface ButtonProperties {
  textContent: string;
  type?: HTMLButtonElement['type'];
  className?: string;
  onClick?: () => void;
}

export interface CarItemProperties {
  [CAR_PROPERTIES.ID]: number;
  [CAR_PROPERTIES.NAME]: string;
  [CAR_PROPERTIES.COLOR]: string;
}

export interface State {
  currentPage: number;
  carsCount: number;

  inputName: string;
  inputColor: string;
}

export interface Store {
  getState: () => State;

  setPage: (newState: Partial<State>) => void;

  setCount: (newState: Partial<State>) => void;

  setName: (newState: Partial<State>) => void;

  setColor: (newState: Partial<State>) => void;

  subscribe: (event: string, callback: Listener) => void;
}
