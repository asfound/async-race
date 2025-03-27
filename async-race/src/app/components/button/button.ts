import type { ButtonProperties } from '~/app/types/interfaces';

import { DEFAULT_BUTTON_TYPE, EVENT_NAME } from '~/app/constants/constants';
import { button } from '~/app/utils/create-element';

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
    textContent,
    type,
  });

  if (className) {
    buttonElement.classList.add(className);
  }

  buttonElement.addEventListener(EVENT_NAME.CLICK, onClick);

  return buttonElement;
};
