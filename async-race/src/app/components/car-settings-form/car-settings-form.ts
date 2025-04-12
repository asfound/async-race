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

interface SettingsFormCallbacks {
  nameInputHandler?: (name: string) => void;
  colorInputHandler?: (color: string) => void;
}

export function createSettingsForm(
  buttonText: string,
  handler: (newName: string, newColor: string) => void,
  nameValue: string,
  colorValue: string,
  callbacks?: SettingsFormCallbacks,
  isButtonDisabled = false
): HTMLFormElement {
  const formElement = form({ className: styles.form, method: 'dialog' });

  const nameInput = createNameInput(nameValue);

  const colorInput = createColorInput(colorValue);

  const submitButton = createButton({
    textContent: buttonText,
    type: BUTTON_TYPE.SUBMIT,
    disabled: isButtonDisabled,
  });

  if (callbacks === undefined) {
    const carSvgElement = createPreviewIcon(colorValue);

    colorInput.addEventListener('input', (event) => {
      if (event.target instanceof HTMLInputElement) {
        carSvgElement.style.fill = event.target.value;
      }
    });

    formElement.prepend(carSvgElement);
  } else {
    setupCallbacks(nameInput, colorInput, callbacks);
  }

  formElement.addEventListener('submit', () => {
    const nameToSubmit = nameInput.value.trim() || getRandomName();
    const colorToSubmit = colorInput.value;

    handler(nameToSubmit, colorToSubmit);
  });

  formElement.append(nameInput, colorInput, submitButton);

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

function createNameInput(value: string): HTMLInputElement {
  return input({
    className: styles.name,
    type: INPUT_TYPE.TEXT,
    placeholder: PLACEHOLDER.NAME,
    value,
  });
}

function createColorInput(value: string): HTMLInputElement {
  return input({
    className: styles.color,
    type: INPUT_TYPE.COLOR,
    value,
  });
}

function createPreviewIcon(colorValue: string): SVGElement {
  const carSvgElement = createSVGElement(
    carSVG,
    colorValue,
    CAR_ICON_SIZE.WIDTH,
    CAR_ICON_SIZE.HEIGHT
  );

  carSvgElement.classList.add(styles.icon);

  return carSvgElement;
}
