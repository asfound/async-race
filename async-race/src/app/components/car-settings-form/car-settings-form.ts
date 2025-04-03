import { form, input } from '~/app/utils/create-element';

import { createButton } from '../button/button';

export function createSettingsForm(
  buttonText: string,
  handler: () => void
): HTMLFormElement {
  const formElement = form({});

  const nameInput = input({ type: 'text' });

  const colorInput = input({ type: 'color', value: '#ff0000' });

  const submitButton = createButton({
    textContent: buttonText,
    type: 'submit',
  });

  formElement.addEventListener('submit', (event) => {
    event.preventDefault();
    handler();
  });

  formElement.append(nameInput, colorInput, submitButton);

  return formElement;
}
