import type { State } from './interfaces';

export type Listener = (data: Partial<State>) => void;
