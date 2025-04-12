import type { Store } from '~/app/types/interfaces';
import type { PaginationPropertiesGetter, Render } from '~/app/types/types';

import { createCarList } from '~/app/components/car-list/car-list';
import { createSettingsForm } from '~/app/components/car-settings-form/car-settings-form';
import { createGarageTitle } from '~/app/components/garage-title/garage-title';
import { createMenu } from '~/app/components/menu/menu';
import { createPaginationControls } from '~/app/components/pagination-controls/pagination-controls';
import { createRaceControls } from '~/app/components/race-controls/race-controls';
import { BUTTON_TEXT, CARS_PER_PAGE } from '~/app/constants/constants';
import { CarService } from '~/app/services/car/car-service';
import { RaceService } from '~/app/services/race/race-service';
import { EventType, GarageStatus } from '~/app/types/enums';
import { showErrorModal } from '~/app/utils/show-modal';

import { div } from '../../utils/create-element';
import styles from './garage-page.module.css';

export function createGaragePage(store: Store): HTMLElement {
  const container = div({});

  const { currentPage } = store.getState();

  const carService = new CarService(store);

  carService.goToPage(currentPage).catch(showErrorModal);

  const menuElement = createMenu(store);

  const titleContainer = createGarageTitle(store);

  const raceService = new RaceService(store);

  const garagePaginationPropertiesGetter = initGaragePaginationPropertiesGetter(
    carService,
    raceService
  );

  const paginationControls = createPaginationControls(
    store,
    garagePaginationPropertiesGetter,
    [
      EventType.PAGE_CHANGE,
      EventType.COUNT_CHANGE,
      EventType.GARAGE_STATUS_CHANGE,
    ]
  );

  const raceControls = createRaceControls(store, carService, raceService);

  const carCreationForm = createCarCreationForm(store, carService);

  container.append(menuElement, titleContainer, raceControls, carCreationForm);

  const carsList = createCarList(store, carService, raceService);

  container.append(paginationControls, carsList);

  return container;
}

function createCarCreationForm(
  store: Store,
  carService: CarService
): HTMLElement {
  const container = div({ className: styles.form });

  const carAdditionHandler = (name: string, color: string): void => {
    carService.addCar(name, color).catch(showErrorModal);
  };

  const nameInputHandler = (name: string): void => {
    store.updateState({ nameInputValue: name });
  };

  const colorInputHandler = (color: string): void => {
    store.updateState({ colorInputValue: color });
  };

  const render: Render = (state) => {
    container.replaceChildren();

    const { nameInputValue, colorInputValue, garageStatus } = state;

    const isAddDisabled = garageStatus === GarageStatus.RACING;

    const carCreationForm = createSettingsForm(
      BUTTON_TEXT.ADD_CAR,
      carAdditionHandler,
      nameInputValue,
      colorInputValue,
      { nameInputHandler, colorInputHandler },
      isAddDisabled
    );

    container.append(carCreationForm);
  };

  render(store.getState());

  store.subscribe(EventType.GARAGE_STATUS_CHANGE, render);

  return container;
}

function initGaragePaginationPropertiesGetter(
  carService: CarService,
  raceService: RaceService
): PaginationPropertiesGetter {
  return (state) => {
    return {
      currentPage: state.currentPage,
      itemsCount: state.carsCount,
      itemsPerPage: CARS_PER_PAGE,
      onPageChange: (newPage): void => {
        carService
          .goToPage(newPage)
          .then(() => {
            raceService.resetOnPageChange();
          })
          .catch(showErrorModal);
      },
      isDisabled: state.garageStatus === GarageStatus.RACING,
    };
  };
}
