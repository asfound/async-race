import { p } from '~/app/utils/create-element';

import { createModal } from '../components/modal/modal';
import { ERROR_TEXT } from '../constants/constants';

export function showErrorModal(error: unknown): void {
  const text = p({ textContent: ERROR_TEXT.UNKNOWN });

  if (error instanceof Error) {
    text.textContent = error.message;
  }

  const modal = createModal(text);

  document.body.prepend(modal);

  modal.showModal();
}
