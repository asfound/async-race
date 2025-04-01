export interface ButtonProperties {
  textContent: string;
  type?: HTMLButtonElement['type'];
  className?: string;
  signal?: AbortSignal;
  onClick: () => void;
}

export interface CarItemProperties {
  id: number;
  name: string;
  color: string;
}
