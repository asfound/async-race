import type { ButtonProperties } from '~/app/types/interfaces';

import { DEFAULT_BUTTON_TYPE } from '~/app/constants/constants';
import { button } from '~/app/utils/create-element';

import styles from './button.module.css';
export const createButton = (
  properties: ButtonProperties
): HTMLButtonElement => {
  const {
    textContent,
    type = DEFAULT_BUTTON_TYPE,
    className,
    onClick,
  } = properties;

  const buttonElement = button({
    className: styles.button,
    textContent,
    type,
  });

  if (className) {
    buttonElement.classList.add(className);
  }

  if (onClick) {
    buttonElement.addEventListener('click', onClick);
  }

  return buttonElement;
};
