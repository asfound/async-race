import { INPUT_TYPE, PLACEHOLDERS } from '~/app/constants/constants';
import { form, input } from '~/app/utils/create-element';
import { getRandomName } from '~/app/utils/get-random-name';

import { createButton } from '../button/button';
import styles from './car-settings-form.module.css';

export function createSettingsForm(
  buttonText: string,
  handler: (newName: string, newColor: string) => void,
  storedName: string,
  storedColor: string,
  callbacks?: {
    nameInputHandler?: (name: string) => void;
    colorInputHandler?: (color: string) => void;
  }
): HTMLFormElement {
  const formElement = form({ className: styles.form, method: 'dialog' });

  const nameInput = input({
    className: styles.name,
    type: INPUT_TYPE.TEXT,
    placeholder: PLACEHOLDERS.NAME,
  });

  if (storedName) {
    nameInput.value = storedName;
  }

  const colorInput = input({
    className: styles.color,
    type: INPUT_TYPE.COLOR,
    value: storedColor,
  });

  const submitButton = createButton({
    textContent: buttonText,
    type: 'submit',
  });

  if (callbacks !== undefined) {
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

  formElement.addEventListener('submit', () => {
    const providedName = nameInput.value.trim() || getRandomName();
    const providedColor = colorInput.value;

    handler(providedName, providedColor);
  });

  formElement.append(nameInput, colorInput, submitButton);

  return formElement;
}
