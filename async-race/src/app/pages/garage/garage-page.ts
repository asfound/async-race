import { createButton } from '../../components/button/button';
import { createCar, getCars } from '../../services/api/async-race-api';
import { div, ul } from '../../utils/create-element';
import { getRandomColor } from '../../utils/get-random-color';
import { getRandomName } from '../../utils/get-random-name';
import { loadCars } from './utils/load-cars';
import { renderCarsList } from './utils/render-cars-list';

export function createGaragePage(): HTMLElement {
  console.log(getCars());

  const container = div({}, ['Garage']);
  const carsList = ul({});

  const addCarButton = createButton({
    textContent: 'Add Car',
    onClick: () => {
      createCar(getRandomName(), getRandomColor())
        .then(() => loadCars())
        .then(({ cars }) => {
          renderCarsList(cars, carsList);
        })
        .catch((error: unknown) => {
          console.error('Error during car creation or loading:', error);
        });
    },
  });

  loadCars()
    .then(({ cars }) => {
      renderCarsList(cars, carsList);
    })
    .catch((error: unknown) => {
      console.error('Error loading cars:', error);
    });

  container.append(addCarButton, carsList);

  return container;
}
