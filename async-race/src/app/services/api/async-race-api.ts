import type { CarItemProperties } from '~/app/types/interfaces';

import {
  BASE_URL,
  CARS_PER_PAGE,
  CONTENT_TYPE,
  EMPTY_COUNT,
  ERROR_TEXT,
  HEADER,
  HTTP_METHOD,
  HTTP_STATUS,
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
      Number(response.headers.get(HEADER.X_TOTAL_COUNT)) || EMPTY_COUNT;

    console.log(cars, totalCount);

    return { cars, totalCount };
  } catch {
    return { cars: [], totalCount: EMPTY_COUNT };
  }
}

export async function getCar(id: number): Promise<unknown> {
  const response = await fetch(`${BASE_URL}${PATH.GARAGE}/${String(id)}`);

  if (response.status !== HTTP_STATUS.OK) {
    throw new Error(ERROR_TEXT.GET);
  }

  return response.json();
}

export async function createCar(name: string, color: string): Promise<unknown> {
  const response = await fetch(`${BASE_URL}${PATH.GARAGE}`, {
    method: HTTP_METHOD.POST,
    body: JSON.stringify({ name, color }),
    headers: { [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON },
  });

  if (response.status !== HTTP_STATUS.CREATED) {
    throw new Error(ERROR_TEXT.CREATE);
  }

  return response.json();
}

export async function deleteCar(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}${PATH.GARAGE}/${String(id)}`, {
    method: HTTP_METHOD.DELETE,
  });

  if (response.status !== HTTP_STATUS.OK) {
    throw new Error(ERROR_TEXT.DELETE);
  }
}

export async function updateCar(
  properties: CarItemProperties
): Promise<unknown> {
  const response = await fetch(
    `${BASE_URL}${PATH.GARAGE}/${String(properties.id)}`,
    {
      method: HTTP_METHOD.PUT,
      headers: { [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON },
      body: JSON.stringify({ name: properties.name, color: properties.color }),
    }
  );

  if (response.status !== HTTP_STATUS.OK) {
    throw new Error(ERROR_TEXT.UPDATE);
  }

  return response.json();
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
