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

export const winnersService = {
  registerWinner,
  updateWinner,
};
