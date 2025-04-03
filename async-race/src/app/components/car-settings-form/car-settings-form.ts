import {
  DEFAULT_COLOR,
  INPUT_TYPE,
  PLACEHOLDERS,
} from '~/app/constants/constants';
import { form, input } from '~/app/utils/create-element';
import { getRandomName } from '~/app/utils/get-random-name';

import { createButton } from '../button/button';

export function createSettingsForm(
  buttonText: string,
  handler: (name: string, color: string) => void
): HTMLFormElement {
  const formElement = form({ method: 'dialog' });

  const nameInput = input({
    type: INPUT_TYPE.TEXT,
    placeholder: PLACEHOLDERS.NAME,
  });

  const colorInput = input({ type: INPUT_TYPE.COLOR, value: DEFAULT_COLOR });

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
