import type {
  CAR_PROPERTIES,
  ENGINE_PROPERTIES,
  WINNER_PROPERTIES,
} from '../constants/constants';
import type { Route } from '../router/route';
import type {
  CarEventType,
  CarStatus,
  EventType,
  GarageStatus,
  SortField,
  SortOrder,
} from './enums';
import type { CarListener, Listener } from './types';

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
  currentCarsPage: number;
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

  currentAppPage: Route;
}

export interface Store {
  getState: () => State;

  setPage: (newState: Partial<State>) => void;

  setWinnersPage: (newState: Partial<State>) => void;

  setCount: (newState: Partial<State>) => void;

  updateState: (newState: Partial<State>) => void;

  updateGarageStatus: (newStatus: GarageStatus) => void;

  setAppPage: (route: Route) => void;

  subscribe: (event: EventType, callback: Listener<State>) => void;
}

export interface PaginationControlsProperties {
  currentPage: number;
  itemsCount: number;
  itemsPerPage: number;
  onPageChange: (newPage: number) => void;
  isDisabled: boolean;
}

export interface RaceControlsState {
  isGenerateDisabled: boolean;
  isRaceDisabled: boolean;
  isResetDisabled: boolean;
}

export interface ControlsState {
  isStartDisabled: boolean;
  isReturnDisabled: boolean;
  isEditDisabled: boolean;
  isDeleteDisabled: boolean;
}

export interface SettingsFormCallbacks {
  nameInputHandler?: (name: string) => void;
  colorInputHandler?: (color: string) => void;
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
