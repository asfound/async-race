import { p } from '~/app/utils/create-element';

import { createModal } from '../components/modal/modal';
import { ERROR_TEXT } from '../constants/constants';

export function showModal(content: HTMLElement): void {
  const modalWindow = createModal(content);

  document.body.prepend(modalWindow);

  modalWindow.showModal();
}

export function showErrorModal(error: unknown): void {
  const text = p({ textContent: ERROR_TEXT.UNKNOWN });

  if (error instanceof Error) {
    text.textContent = error.message;
  }

  showModal(text);
}
