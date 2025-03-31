import { createCarsList } from '../components/cars-list/cars-list';
import { getCars } from '../services/api/async-race-api';
import { div } from '../utils/create-element';

export function createGaragePage(): HTMLElement {
  console.log(getCars());
  const container = div({}, ['Garage']);

  const list = createCarsList();

  container.append(list);

  return container;
}
