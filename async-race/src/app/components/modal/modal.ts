import { dialog } from '~/app/utils/create-element';

import styles from './modal.module.css';

export function createModal(content: HTMLElement): HTMLDialogElement {
  const modalWindow = dialog({ className: styles.modal });

  content.classList.add(styles.content);

  modalWindow.addEventListener('click', (event) => {
    if (event.target === modalWindow) {
      modalWindow.close();
      modalWindow.remove();
    }
  });

  modalWindow.append(content);

  return modalWindow;
}
