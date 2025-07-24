import { EMPTY_STRING } from '~/app/constants/constants';
import { dialog } from '~/app/utils/create-element';

import { createButton } from '../button/button';
import styles from './modal.module.css';

export function createModal(content: HTMLElement): HTMLDialogElement {
  const modalWindow = dialog({ className: styles.modal });

  const closeModal = (): void => {
    modalWindow.close();
    modalWindow.remove();
  };

  content.classList.add(styles.content);

  modalWindow.addEventListener('click', (event) => {
    if (event.target === modalWindow) {
      closeModal();
    }
  });

  const closeButton = createButton({
    textContent: EMPTY_STRING,
    className: styles.button,
  });

  closeButton.addEventListener('click', closeModal);

  modalWindow.append(closeButton, content);

  return modalWindow;
}
