import {
  BUTTON_TYPE,
  CAR_ICON_SIZE,
  INPUT_TYPE,
  PLACEHOLDER,
} from '~/app/constants/constants';
import { form, input } from '~/app/utils/create-element';
import { createSVGElement } from '~/app/utils/create-svg-icon';
import { getRandomName } from '~/app/utils/get-random-name';
import carSVG from '~/assets/icons/car.svg?raw';

import { createButton } from '../button/button';
import styles from './car-settings-form.module.css';

export function createSettingsForm(
  buttonText: string,
  handler: (newName: string, newColor: string) => void,
  nameValue: string,
  colorValue: string,

  callbacks?: {
    nameInputHandler?: (name: string) => void;
    colorInputHandler?: (color: string) => void;
  },
  isButtonDisabled = false
): HTMLFormElement {
  const formElement = form({ className: styles.form, method: 'dialog' });

  const nameInput = input({
    className: styles.name,
    type: INPUT_TYPE.TEXT,
    placeholder: PLACEHOLDER.NAME,
  });

  if (nameValue) {
    nameInput.value = nameValue;
  }

  const colorInput = input({
    className: styles.color,
    type: INPUT_TYPE.COLOR,
    value: colorValue,
  });

  const submitButton = createButton({
    textContent: buttonText,
    type: BUTTON_TYPE.SUBMIT,
    disabled: isButtonDisabled,
  });

  if (callbacks !== undefined) {
    setupCallbacks(nameInput, colorInput, callbacks);
  }

  formElement.addEventListener('submit', () => {
    const nameToSubmit = nameInput.value.trim() || getRandomName();
    const colorToSubmit = colorInput.value;

    handler(nameToSubmit, colorToSubmit);
  });

  formElement.append(nameInput, colorInput, submitButton);

  if (!callbacks) {
    const carSvgElement = createSVGElement(
      carSVG,
      colorValue,
      CAR_ICON_SIZE.WIDTH,
      CAR_ICON_SIZE.HEIGHT
    );

    carSvgElement.classList.add(styles.icon);

    colorInput.addEventListener('input', (event) => {
      if (event.target instanceof HTMLInputElement) {
        carSvgElement.style.fill = event.target.value;
      }
    });

    formElement.prepend(carSvgElement);
  }

  return formElement;
}

function setupCallbacks(
  nameInput: HTMLInputElement,
  colorInput: HTMLInputElement,
  callbacks: {
    nameInputHandler?: (name: string) => void;
    colorInputHandler?: (color: string) => void;
  }
): void {
  nameInput.addEventListener('input', (event) => {
    if (event.target instanceof HTMLInputElement) {
      callbacks.nameInputHandler?.(event.target.value);
    }
  });

  colorInput.addEventListener('input', (event) => {
    if (event.target instanceof HTMLInputElement) {
      callbacks.colorInputHandler?.(event.target.value);
    }
  });
}
