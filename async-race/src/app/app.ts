import { createButton } from '~/app/components/button/button';
import { BUTTON_TEXT } from '~/app/constants/constants';
import { div, main, section } from '~/app/utils/create-element';

import styles from './app.module.css';
import { createGaragePage } from './pages/garage/garage-page';
import { createWinnersPage } from './pages/winners/winners-page';
import { Route } from './router/route';
import { initRouter, navigate } from './router/router';
import { initializeCarCount } from './store/store';

export function initApp(): void {
  initializeCarCount()
    .then(initInternal)
    .catch((error: unknown) => {
      console.log(error);
    });
}

function initInternal(): void {
  const buttonsContainer = div({ className: styles.container });

  const garageButton = createButton({
    textContent: BUTTON_TEXT.GARAGE,
    onClick: () => {
      navigate(Route.GARAGE);
    },
  });

  const winnersButton = createButton({
    textContent: BUTTON_TEXT.WINNERS,
    onClick: () => {
      navigate(Route.WINNERS);
    },
  });

  buttonsContainer.append(garageButton, winnersButton);

  const mainElement = main({ className: styles.main }, [buttonsContainer]);

  const root = section({});

  mainElement.append(root);

  document.body.append(mainElement);

  // TODO add error page
  initRouter({
    root,
    routes: {
      [Route.GARAGE]: createGaragePage,
      [Route.WINNERS]: createWinnersPage,
    },
  });
}
