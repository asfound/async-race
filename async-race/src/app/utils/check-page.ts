import { CARS_PER_PAGE, DEFAULT_PAGE } from '~/app/constants/constants';

export function calculateLastPage(totalCount: number): number {
  return Math.ceil(totalCount / CARS_PER_PAGE);
}

export function isOnCurrent(currentPage: number, totalCount: number): boolean {
  const lastItemOnPage = currentPage * CARS_PER_PAGE;
  return totalCount < lastItemOnPage;
}

export function isOnFirst(currentPage: number): boolean {
  return currentPage === DEFAULT_PAGE;
}

export function isOnLast(currentPage: number, totalCount: number): boolean {
  const lastPage = Math.ceil(totalCount / CARS_PER_PAGE);
  return currentPage === lastPage;
}

export function isExceeding(currentPage: number, totalCount: number): boolean {
  const lastPage = calculateLastPage(totalCount);
  return currentPage > lastPage;
}
