import { createButton } from '~/app/components/button/button';
import { BUTTON_TEXT_CONTENT } from '~/app/constants/constants';
import { main, section } from '~/app/utils/create-element';

import styles from './app.module.css';
import { createGaragePage } from './pages/garage/garage-page';
import { createWinnersPage } from './pages/winners/winners-page';
import { Route } from './router/route';
import { initRouter, navigate } from './router/router';

export function initApp(): void {
  const garageButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.GARAGE,
    onClick: () => {
      navigate(Route.GARAGE);
    },
  });

  const winnersButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.WINNERS,
    onClick: () => {
      navigate(Route.WINNERS);
    },
  });

  const mainElement = main({ className: styles.main }, [
    garageButton,
    winnersButton,
  ]);
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
