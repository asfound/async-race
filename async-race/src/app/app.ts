import { createButton } from '~/app/components/button/button';
import { BUTTON_TEXT_CONTENT } from '~/app/constants/constants';
import { div, main } from '~/app/utils/create-element';

import { createGaragePage } from './pages/garage';
import { createWinnersPage } from './pages/winners';
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

  const root = div({});
  document.body.append(main({}, [garageButton, winnersButton]), root);

  // TODO add error page
  initRouter({
    root,
    routes: {
      [Route.GARAGE]: createGaragePage,
      [Route.WINNERS]: createWinnersPage,
    },
  });
}
