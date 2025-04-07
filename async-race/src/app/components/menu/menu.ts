import type { Store } from '~/app/types/interfaces';
import type { Render } from '~/app/types/types';

import { BUTTON_TEXT } from '~/app/constants/constants';
import { Route } from '~/app/router/route';
import { navigate } from '~/app/router/router';
import { EventType, GarageStatus } from '~/app/types/enums';
import { div } from '~/app/utils/create-element';

import { createButton } from '../button/button';
import styles from './menu.module.css';

export function createMenu(store: Store): HTMLElement {
  const buttonsContainer = div({ className: styles.container });

  const render: Render = ({ garageStatus, currentAppPage }) => {
    buttonsContainer.replaceChildren();

    const isRacing = garageStatus === GarageStatus.RACING;

    const garageButton = createButton({
      textContent: BUTTON_TEXT.GARAGE,
      onClick: () => {
        navigate(Route.GARAGE);
      },
      disabled: isRacing || currentAppPage === Route.GARAGE,
    });

    const winnersButton = createButton({
      textContent: BUTTON_TEXT.WINNERS,
      onClick: () => {
        navigate(Route.WINNERS);
      },
      disabled: isRacing || currentAppPage === Route.WINNERS,
    });

    buttonsContainer.append(garageButton, winnersButton);
  };

  render(store.getState());

  store.subscribe(EventType.GARAGE_STATUS_CHANGE, render);
  store.subscribe(EventType.APP_PAGE_CHANGE, render);

  return buttonsContainer;
}
