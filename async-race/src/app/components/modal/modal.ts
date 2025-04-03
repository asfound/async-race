import { dialog, div } from '~/app/utils/create-element';

import styles from './modal.module.css';

export function createModal(content: HTMLElement): HTMLDialogElement {
  const modalWindow = dialog({ className: styles.modal });
  const container = div({ className: styles.container });

  modalWindow.addEventListener('click', (event) => {
    console.log(event.target, event.currentTarget);
    if (event.target !== container) {
      modalWindow.close();
      modalWindow.remove();
    }
  });

  container.append(content);
  modalWindow.append(container);

  return modalWindow;
}
