import { createButton } from '~/app/components/button/button';
import { BUTTON_TEXT, DEFAULT_PAGE } from '~/app/constants/constants';
import { div, main, section } from '~/app/utils/create-element';

import styles from './app.module.css';
import { createGaragePage } from './pages/garage/garage-page';
import { createWinnersPage } from './pages/winners/winners-page';
import { Route } from './router/route';
import { initRouter, navigate } from './router/router';
import { CarService } from './services/car/car-service';
import { store } from './store/store';
import { showErrorModal } from './utils/show-error-modal';

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
      [Route.GARAGE]: () => createGaragePage(carService),
      [Route.WINNERS]: createWinnersPage,
    },
  });
}
//init ui init router
//pass store
