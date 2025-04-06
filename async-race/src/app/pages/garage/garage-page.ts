import type { CarService } from '~/app/services/car/car-service';
import type { Store } from '~/app/types/interfaces';

import { createCarList } from '~/app/components/car-list/car-list';
import { createSettingsForm } from '~/app/components/car-settings-form/car-settings-form';
import { createPaginationControls } from '~/app/components/garage-pagination-controls/garage-pagination-controls';
import { createGarageTitle } from '~/app/components/garage-title/garage-title';
import { createRaceControls } from '~/app/components/race-controls/race-controls';
import { BUTTON_TEXT } from '~/app/constants/constants';
import { createRaceService } from '~/app/services/race/race-service';
import { store } from '~/app/store/store';
import { showErrorModal } from '~/app/utils/show-modal';

import { div } from '../../utils/create-element';
import styles from './garage-page.module.css';

export function createGaragePage(carService: CarService): HTMLElement {
  const container = div({});

  const titleContainer = createGarageTitle(store);

  const raceService = createRaceService();

  const paginationControls = createPaginationControls(store, carService);

  const raceControls = createRaceControls(store, raceService);

  const carCreationForm = createCarCreationForm(store, carService);

  container.append(titleContainer, raceControls, carCreationForm);

  const carsList = createCarList(store, carService, raceService);

  container.append(paginationControls, carsList);

  return container;
}

function createCarCreationForm(
  store: Store,
  carService: CarService
): HTMLFormElement {
  const { nameInputValue, colorInputValue } = store.getState();

  const carAdditionHandler = (name: string, color: string): void => {
    carService.addCar(name, color).catch(showErrorModal);
  };

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
