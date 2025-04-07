import type { Render } from '~/app/types/types';

import { div } from '~/app/utils/create-element';

import { createButton } from '../button/button';
import styles from './sorting-panel.module.css';

export function createSortingPanel(): HTMLElement {
  const container = div({ className: styles.container });

  const render: Render = () => {
    container.replaceChildren();

    const idButton = createButton({ textContent: 'ID' });

    const timeButton = createButton({ textContent: 'Time' });

    const winsButton = createButton({ textContent: 'Wins' });

    const ascendingButton = createButton({ textContent: '↑' });

    const descendingButton = createButton({ textContent: '↓' });

    container.append(
      idButton,
      timeButton,
      winsButton,
      ascendingButton,
      descendingButton
    );
  };

  render();

  return container;
}
