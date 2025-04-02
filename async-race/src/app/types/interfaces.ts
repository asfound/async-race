export interface ButtonProperties {
  textContent: string;
  type?: HTMLButtonElement['type'];
  className?: string;
  onClick?: () => void;
}

export interface CarItemProperties {
  id: number;
  name: string;
  color: string;
}
