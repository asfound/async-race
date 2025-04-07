import { DEFAULT_PAGE } from '~/app/constants/constants';
import { main, section } from '~/app/utils/create-element';

import styles from './app.module.css';
import { createGaragePage } from './pages/garage/garage-page';
import { createWinnersPage } from './pages/winners/winners-page';
import { Route } from './router/route';
import { initRouter } from './router/router';
import { CarService } from './services/car/car-service';
import { store } from './store/store';
import { showErrorModal } from './utils/show-modal';

export function initApp(): void {
  const carService = new CarService(store);
  carService
    .goToPage(DEFAULT_PAGE)
    .then(() => {
      initUI(carService);
    })
    .catch(showErrorModal);
}

function initUI(carService: CarService): void {
  const mainElement = main({ className: styles.main });

  const root = section({});

  mainElement.append(root);

  document.body.append(mainElement);

  // TODO add error page
  initRouter({
    root,
    routes: {
      [Route.GARAGE]: () => createGaragePage(carService),
      [Route.WINNERS]: () => createWinnersPage(store),
    },
  });
}
//init ui init router
//pass store
