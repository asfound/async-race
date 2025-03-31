export interface ButtonProperties {
  textContent: string;
  type?: HTMLButtonElement['type'];
  className?: string;
  signal?: AbortSignal;
  onClick: () => void;
}
