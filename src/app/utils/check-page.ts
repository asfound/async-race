import { DEFAULT_PAGE } from '~/app/constants/constants';

export function calculateLastPage(
  totalCount: number,
  itemsPerPage: number
): number {
  return Math.ceil(totalCount / itemsPerPage) || DEFAULT_PAGE;
}

export function isOnCurrent(
  currentPage: number,
  totalCount: number,
  itemsPerPage: number
): boolean {
  const lastItemOnPage = currentPage * itemsPerPage;
  return totalCount <= lastItemOnPage;
}

export function isOnFirst(currentPage: number): boolean {
  return currentPage === DEFAULT_PAGE;
}

export function isOnLast(
  currentPage: number,
  totalCount: number,
  itemsPerPage: number
): boolean {
  const lastPage = calculateLastPage(totalCount, itemsPerPage);
  return currentPage === lastPage;
}

export function isExceeding(
  currentPage: number,
  totalCount: number,
  itemsPerPage: number
): boolean {
  const lastPage = calculateLastPage(totalCount, itemsPerPage);
  return currentPage > lastPage;
}
