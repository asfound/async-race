import type { CarItemProperties } from '~/app/types/interfaces';

import { DEFAULT_NUMBER_VALUE } from '~/app/constants/constants';
import { assertCarItemPropertiesArray } from '~/app/utils/type-guards';

const BASE_URL = 'http://127.0.0.1:3000';

const PATH = {
  GARAGE: '/garage',
  ENGINE: '/engine',
  WINNERS: '/winners',
} as const;

const CARS_PER_PAGE = 7;

export async function getCars(
  page: number
): Promise<{ cars: CarItemProperties[]; totalCount: number }> {
  const query = new URLSearchParams();

  query.append('_page', page.toString());
  query.append('_limit', CARS_PER_PAGE.toString());

  const response = await fetch(`${BASE_URL}${PATH.GARAGE}?${query.toString()}`);

  const cars: unknown = await response.json();

  assertCarItemPropertiesArray(cars);

  const totalCount =
    Number(response.headers.get('X-Total-Count')) || DEFAULT_NUMBER_VALUE;

  console.log(cars, totalCount);

  return { cars, totalCount };
}

export async function getCar(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}${PATH.GARAGE}/${String(id)}`);
  const data: unknown = await response.json();

  console.log(data);
}

export async function createCar(name: string, color: string): Promise<unknown> {
  const response = await fetch(`${BASE_URL}${PATH.GARAGE}`, {
    method: 'POST',
    body: JSON.stringify({ name, color }),
    headers: { 'Content-Type': 'application/json' },
  });

  return response.json();
}

export async function deleteCar(id: number): Promise<unknown> {
  return fetch(`${BASE_URL}${PATH.GARAGE}/${String(id)}`, { method: 'DELETE' });
}

export async function getWinners(): Promise<void> {
  const response = await fetch(`${BASE_URL}${PATH.WINNERS}`);
  const data: unknown = await response.json();

  console.log(data);
}

export async function getWinner(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}${PATH.WINNERS}/${String(id)}`);
  const data: unknown = await response.json();

  console.log(data);
}
