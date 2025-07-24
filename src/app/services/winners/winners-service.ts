import type { SortField, SortOrder } from '~/app/types/enums';
import type { Store } from '~/app/types/interfaces';

import { DEFAULT_INCREMENT } from '~/app/constants/constants';
import { showErrorModal } from '~/app/utils/show-modal';

import { apiService } from '../api/api-service';

function registerWinner(id: number, newTime: number): void {
  apiService.createWinner(id, newTime).catch(() => {
    updateWinner(id, newTime);
  });
}

function updateWinner(id: number, newTime: number): void {
  apiService
    .getWinner(id)
    .then((properties) => {
      const { id, wins, time } = properties;

      const timeToRegister = Math.min(newTime, time);

      return apiService.updateWinner({
        id,
        wins: wins + DEFAULT_INCREMENT,
        time: timeToRegister,
      });
    })
    .catch(showErrorModal);
}

function setWinners(
  store: Store,
  page: number,
  sortField: SortField,
  sortOrder: SortOrder
): void {
  apiService
    .getWinners(page, sortField, sortOrder)
    .then(async ({ winners, totalWinners }) => {
      const cars = await Promise.all(
        winners.map((winner) => apiService.getCar(winner.id))
      );

      store.setWinnersPage({
        winnersOnCurrentPage: winners,
        winnersCount: totalWinners,
        winnersCars: cars,
        currentWinnersPage: page,
        sortField,
        sortOrder,
      });
    })
    .catch(showErrorModal);
}

export const winnersService = {
  registerWinner,
  updateWinner,

  setWinners,
};
