import type { GarageStatus } from '../components/race-controls/race-controls';
import type {
  CAR_PROPERTIES,
  ENGINE_PROPERTIES,
  WINNER_PROPERTIES,
} from '../constants/constants';
import type { EventType, SortField, SortOrder } from './enums';
import type { Listener } from './types';

export interface ButtonProperties {
  textContent: string;
  type?: HTMLButtonElement['type'];
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface CarItemProperties {
  [CAR_PROPERTIES.ID]: number;
  [CAR_PROPERTIES.NAME]: string;
  [CAR_PROPERTIES.COLOR]: string;
}

export interface StartEngineProperties {
  [ENGINE_PROPERTIES.VELOCITY]: number;
  [ENGINE_PROPERTIES.DISTANCE]: number;
}

export interface WinnerProperties {
  [WINNER_PROPERTIES.ID]: number;
  [WINNER_PROPERTIES.WINS]: number;
  [WINNER_PROPERTIES.TIME]: number;
}

export interface State {
  currentPage: number;
  carsCount: number;

  nameInputValue: string;
  colorInputValue: string;

  carsOnCurrentPage: CarItemProperties[];

  garageStatus: GarageStatus;

  currentWinnersPage: number;
  winnersCount: number;

  winnersOnCurrentPage: WinnerProperties[];
  winnersCars: CarItemProperties[];

  sortField: SortField;
  sortOrder: SortOrder;
}

//TODO remove duplicate methods

export interface Store {
  getState: () => State;

  setPage: (newState: Partial<State>) => void;

  setWinnersPage: (newState: Partial<State>) => void;

  setCount: (newState: Partial<State>) => void;

  setName: (newState: Partial<State>) => void;

  setColor: (newState: Partial<State>) => void;

  updateState: (newState: Partial<State>) => void;

  updateGarageStatus: (newStatus: GarageStatus) => void;

  subscribe: (event: EventType, callback: Listener<State>) => void;
}
