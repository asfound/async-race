import { CARS_PER_PAGE } from '~/app/constants/constants';

export function checkIfOnCurrent(
  currentPage: number,
  totalCount: number
): boolean {
  const lastItemOnPage = currentPage * CARS_PER_PAGE;
  return totalCount < lastItemOnPage;
}

export function checkIfOnLast(
  currentPage: number,
  totalCount: number
): boolean {
  const lastPage = Math.ceil(totalCount / CARS_PER_PAGE);
  return currentPage === lastPage;
}
