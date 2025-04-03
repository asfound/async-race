import {
  DEFAULT_COLOR,
  INPUT_TYPE,
  PLACEHOLDERS,
} from '~/app/constants/constants';
import { form, input } from '~/app/utils/create-element';
import { getRandomName } from '~/app/utils/get-random-name';

import { createButton } from '../button/button';
import styles from './car-settings-form.module.css';

export function createSettingsForm(
  buttonText: string,
  handler: (name: string, color: string) => void
): HTMLFormElement {
  const formElement = form({ className: styles.form, method: 'dialog' });

  const nameInput = input({
    className: styles.name,
    type: INPUT_TYPE.TEXT,
    placeholder: PLACEHOLDERS.NAME,
  });

  const colorInput = input({
    className: styles.color,
    type: INPUT_TYPE.COLOR,
    value: DEFAULT_COLOR,
  });

  const submitButton = createButton({
    textContent: buttonText,
    type: 'submit',
  });

  formElement.addEventListener('submit', () => {
    const name = nameInput.value.trim() || getRandomName();
    const color = colorInput.value;

    handler(name, color);
  });

  formElement.append(nameInput, colorInput, submitButton);

  return formElement;
}
