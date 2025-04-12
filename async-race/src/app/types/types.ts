import type {
  CarState,
  PaginationControlsProperties,
  State,
} from './interfaces';

export type Listener<T> = (data: T) => void;

export type Render = (state: State) => void;

export type PaginationPropertiesGetter = (
  state: State
) => PaginationControlsProperties;

export type CarListener = (data: CarState) => void;
