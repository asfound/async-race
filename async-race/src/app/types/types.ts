import type { State } from './interfaces';

export type Listener = (data: Partial<State>) => void;

export type CarAdditionHandler = (name: string, color: string) => Promise<void>;
