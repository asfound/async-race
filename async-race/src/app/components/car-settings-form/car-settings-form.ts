import {
  BUTTON_TYPE,
  INPUT_TYPE,
  PLACEHOLDER,
} from '~/app/constants/constants';
import { form, input } from '~/app/utils/create-element';
import { getRandomName } from '~/app/utils/get-random-name';

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
  }
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
