import { getCars } from '~/app/services/api/async-race-api';
import { showErrorModal } from '~/app/utils/show-error-modal';

import { renderCarsList } from './render-list';

export function loadCars(
  carsList: HTMLUListElement,
  currentPage: number
): void {
  getCars(currentPage)
    .then(({ cars }) => {
      renderCarsList(cars, carsList);
    })
    .catch((error: unknown) => {
      showErrorModal(error);
    });
}
