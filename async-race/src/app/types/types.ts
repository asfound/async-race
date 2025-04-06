import type { State } from './interfaces';

export type Listener<T> = (data: T) => void;

export type Render = (state: State) => void;
