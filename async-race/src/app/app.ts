import { createButton } from '~/app/components/button/button';
import { BUTTON_TEXT_CONTENT } from '~/app/constants/constants';
import { main } from '~/app/utils/create-element';

export function initApp(): void {
  const garageButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.GARAGE,
    onClick: () => {
      console.log('Garage');
    },
  });

  const winnersButton = createButton({
    textContent: BUTTON_TEXT_CONTENT.WINNERS,
    onClick: () => {
      console.log('Winners');
    },
  });

  document.body.append(main({}, [garageButton, winnersButton]));
}
