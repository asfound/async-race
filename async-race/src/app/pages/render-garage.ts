import { getCars } from '../services/api/async-race-api';
import { div } from '../utils/create-element';

export function renderGarage(): HTMLElement {
  console.log(getCars());

  return div({}, ['Garage']);
}
