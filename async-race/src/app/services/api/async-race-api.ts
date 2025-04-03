import type { CarItemProperties } from '~/app/types/interfaces';

import {
  BASE_URL,
  CARS_PER_PAGE,
  CONTENT_TYPE,
  DEFAULT_NUMBER_VALUE,
  HEADER,
  HTTP_METHOD,
  PATH,
  QUERY_PARAMETER,
} from '~/app/constants/constants';
import { assertCarItemPropertiesArray } from '~/app/utils/type-guards';

export async function getCars(
  page: number
): Promise<{ cars: CarItemProperties[]; totalCount: number }> {
  const query = new URLSearchParams({
    [QUERY_PARAMETER.PAGE]: page.toString(),
    [QUERY_PARAMETER.LIMIT]: CARS_PER_PAGE.toString(),
  });

  try {
    const response = await fetch(
      `${BASE_URL}${PATH.GARAGE}?${query.toString()}`
    );

    const cars: unknown = await response.json();

    assertCarItemPropertiesArray(cars);

    const totalCount =
      Number(response.headers.get(HEADER.X_TOTAL_COUNT)) ||
      DEFAULT_NUMBER_VALUE;

    console.log(cars, totalCount);

    return { cars, totalCount };
  } catch {
    return { cars: [], totalCount: DEFAULT_NUMBER_VALUE };
  }
}

export async function getCar(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}${PATH.GARAGE}/${String(id)}`);
  const data: unknown = await response.json();

  console.log(data);
}

export async function createCar(name: string, color: string): Promise<unknown> {
  const response = await fetch(`${BASE_URL}${PATH.GARAGE}`, {
    method: HTTP_METHOD.POST,
    body: JSON.stringify({ name, color }),
    headers: { [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON },
  });

  return response.json();
}

export async function deleteCar(id: number): Promise<unknown> {
  return fetch(`${BASE_URL}${PATH.GARAGE}/${String(id)}`, {
    method: HTTP_METHOD.DELETE,
  });
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
