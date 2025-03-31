import { getCars } from '../services/api/async-race-api';
import { div } from '../utils/create-element';

export function createGaragePage(): HTMLElement {
  console.log(getCars());

  return div({}, ['Garage']);
}
