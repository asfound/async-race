import { createButton } from '../components/button/button';
import { createCarsList } from '../components/cars-list/cars-list';
import { getCars } from '../services/api/async-race-api';
import { div } from '../utils/create-element';
import { getRandomColor } from '../utils/get-random-color';
import { getRandomName } from '../utils/get-random-name';

export function createGaragePage(): HTMLElement {
  console.log(getCars());

  const container = div({}, ['Garage']);
  const { list: carsList, addCar } = createCarsList();

  const addCarButton = createButton({
    textContent: 'Add Car',
    onClick: () => addCar(getRandomName(), getRandomColor()),
  });

  container.append(addCarButton, carsList);

  return container;
}
