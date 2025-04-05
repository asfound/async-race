import type { State } from './interfaces';

export type Listener = (data: State) => void;

export type CarAdditionHandler = (name: string, color: string) => Promise<void>;

export type Render = (state: State) => void;
