import { createModal } from '../components/modal/modal';

export function showModal(content: HTMLElement): void {
  const modalWindow = createModal(content);
  document.body.prepend(modalWindow);
  modalWindow.showModal();
}
