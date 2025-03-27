export interface ButtonProperties {
  textContent: string;
  type?: HTMLButtonElement['type'];
  className?: string;
  onClick: () => void;
}
