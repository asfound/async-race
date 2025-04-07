import type { PaginationControlsProperties, State } from './interfaces';

export type Listener<T> = (data: T) => void;

export type Render = (state: State) => void;

export type PaginationPropertiesGetter = (
  state: State
) => PaginationControlsProperties;
