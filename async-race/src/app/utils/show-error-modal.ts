import { p } from '~/app/utils/create-element';

import { ERROR_TEXT } from '../constants/constants';
import { showModal } from './show-modal';

export function showErrorModal(error: unknown): void {
  const text = p({ textContent: ERROR_TEXT.UNKNOWN });

  if (error instanceof Error) {
    text.textContent = error.message;
  }

  showModal(text);
}
