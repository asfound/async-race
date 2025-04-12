import { main, section } from '~/app/utils/create-element';

import styles from './app.module.css';
import { createGaragePage } from './pages/garage/garage-page';
import { createWinnersPage } from './pages/winners/winners-page';
import { Route } from './router/route';
import { initRouter } from './router/router';
import { store } from './store/store';

export function initApp(): void {
  const mainElement = main({ className: styles.main });

  const root = section({});

  mainElement.append(root);

  document.body.append(mainElement);

  // TODO add error page
  initRouter({
    root,
    routes: {
      [Route.GARAGE]: () => createGaragePage(store),
      [Route.WINNERS]: () => createWinnersPage(store),
    },
  });
}
