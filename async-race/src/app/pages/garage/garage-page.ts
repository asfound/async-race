import type { Store } from '~/app/types/interfaces';
import type { CarAdditionHandler } from '~/app/types/types';

import { createCarList } from '~/app/components/car-list/car-list';
import { createSettingsForm } from '~/app/components/car-settings-form/car-settings-form';
import { createPaginationControls } from '~/app/components/garage-pagination-controls/garage-pagination-controls';
import { createGarageTitle } from '~/app/components/garage-title/garage-title';
import { createRaceControls } from '~/app/components/race-controls/race-controls';
import { BUTTON_TEXT, DEFAULT_INCREMENT } from '~/app/constants/constants';
import { store } from '~/app/store/store';
import { showErrorModal } from '~/app/utils/show-error-modal';

import { createCar } from '../../services/api/api-service';
import { div } from '../../utils/create-element';
import styles from './garage-page.module.css';

export function createGaragePage(): HTMLElement {
  const container = div({});

  const titleContainer = createGarageTitle(store);

  const paginationControls = createPaginationControls(store);

  const raceControls = createRaceControls(store);

  const carCreationForm = createCarCreationForm(store);

  container.append(titleContainer, raceControls, carCreationForm);

  const carsList = createCarList(store);

  container.append(paginationControls, carsList);

  return container;
}

function createCarCreationForm(store: Store): HTMLFormElement {
  const { nameInputValue, colorInputValue } = store.getState();
  const carAdditionHandler = createCarAdditionHandler(store);

  const nameInputHandler = (name: string): void => {
    store.setColor({ nameInputValue: name });
  };

  const colorInputHandler = (color: string): void => {
    store.setColor({ colorInputValue: color });
  };
  const carCreationForm = createSettingsForm(
    BUTTON_TEXT.ADD_CAR,
    carAdditionHandler,
    nameInputValue,
    colorInputValue,
    { nameInputHandler, colorInputHandler }
  );
  carCreationForm.classList.add(styles.form);
  return carCreationForm;
}

function createCarAdditionHandler(store: Store): CarAdditionHandler {
  return async (name, color): Promise<void> => {
    try {
      await createCar(name, color);
      const { carsCount: currentCount } = store.getState();

      store.setCount({ carsCount: currentCount + DEFAULT_INCREMENT });
    } catch (error) {
      showErrorModal(error);
    }
  };
}
