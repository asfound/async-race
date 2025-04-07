import type { SortField, SortOrder } from '~/app/types/enums';
import type {
  CarItemProperties,
  StartEngineProperties,
  WinnerProperties,
} from '~/app/types/interfaces';

import {
  BASE_URL,
  CAR_STATUS,
  CARS_PER_PAGE,
  CONTENT_TYPE,
  EMPTY_COUNT,
  ERROR_TEXT,
  HEADER,
  HTTP_METHOD,
  HTTP_STATUS,
  PATH,
  QUERY_PARAMETER,
  WIN_AMOUNT,
  WINNERS_PER_PAGE,
} from '~/app/constants/constants';
import { EngineError } from '~/app/utils/custom-errors';
import {
  assertCarItemPropertiesArray,
  assertIsCarItemProperties,
  assertIsStartEngineProperties,
  assertIsWinnerProperties,
  assertWinnerPropertiesArray,
} from '~/app/utils/type-guards';

async function getCars(
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

async function getCar(id: number): Promise<CarItemProperties> {
  const response = await fetch(`${BASE_URL}${PATH.GARAGE}/${String(id)}`);

  const car: unknown = await response.json();
  if (response.status !== HTTP_STATUS.OK) {
    throw new Error(ERROR_TEXT.GET_CAR);
  }

  assertIsCarItemProperties(car);

  return car;
}

async function createCar(name: string, color: string): Promise<unknown> {
  const response = await fetch(`${BASE_URL}${PATH.GARAGE}`, {
    method: HTTP_METHOD.POST,
    body: JSON.stringify({ name, color }),
    headers: { [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON },
  });

  if (response.status !== HTTP_STATUS.CREATED) {
    throw new Error(ERROR_TEXT.CREATE_CAR);
  }

  return response.json();
}

async function deleteCar(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}${PATH.GARAGE}/${String(id)}`, {
    method: HTTP_METHOD.DELETE,
  });

  if (response.status !== HTTP_STATUS.OK) {
    throw new Error(ERROR_TEXT.DELETE_CAR);
  }
}

async function updateCar(properties: CarItemProperties): Promise<unknown> {
  const response = await fetch(
    `${BASE_URL}${PATH.GARAGE}/${String(properties.id)}`,
    {
      method: HTTP_METHOD.PUT,
      headers: { [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON },
      body: JSON.stringify({ name: properties.name, color: properties.color }),
    }
  );

  if (response.status !== HTTP_STATUS.OK) {
    throw new Error(ERROR_TEXT.UPDATE_CAR);
  }

  return response.json();
}

async function startCar(id: number): Promise<StartEngineProperties> {
  const query = new URLSearchParams({
    id: id.toString(),
    status: CAR_STATUS.STARTED,
  });

  const response = await fetch(
    `${BASE_URL}${PATH.ENGINE}?${query.toString()}`,
    {
      method: HTTP_METHOD.PATCH,
    }
  );

  if (response.status !== HTTP_STATUS.OK) {
    throw new Error(ERROR_TEXT.START);
  }

  const data: unknown = await response.json();

  assertIsStartEngineProperties(data);

  return data;
}

async function driveCar(id: number, signal: AbortSignal): Promise<void> {
  const query = new URLSearchParams({
    id: id.toString(),
    status: CAR_STATUS.DRIVE,
  });

  const response = await fetch(
    `${BASE_URL}${PATH.ENGINE}?${query.toString()}`,
    {
      method: HTTP_METHOD.PATCH,
      signal,
    }
  );

  if (response.status !== HTTP_STATUS.OK) {
    const errorData = await response.text();
    throw new EngineError(response.status, errorData);
  }
}

async function stopCar(id: number): Promise<void> {
  const query = new URLSearchParams({
    id: id.toString(),
    status: CAR_STATUS.STOPPED,
  });

  const response = await fetch(
    `${BASE_URL}${PATH.ENGINE}?${query.toString()}`,
    {
      method: HTTP_METHOD.PATCH,
    }
  );

  if (response.status !== HTTP_STATUS.OK) {
    throw new Error(ERROR_TEXT.STOP);
  }
}

async function getWinners(
  page: number,
  sortField: SortField,
  sortOrder: SortOrder
): Promise<{ winners: WinnerProperties[]; totalWinners: number }> {
  const query = new URLSearchParams({
    [QUERY_PARAMETER.PAGE]: page.toString(),
    [QUERY_PARAMETER.LIMIT]: WINNERS_PER_PAGE.toString(),
    [QUERY_PARAMETER.SORT]: sortField,
    [QUERY_PARAMETER.ORDER]: sortOrder,
  });

  console.log(query.toString());
  try {
    const response = await fetch(
      `${BASE_URL}${PATH.WINNERS}?${query.toString()}`
    );
    const winners: unknown = await response.json();

    assertWinnerPropertiesArray(winners);

    const totalWinners =
      Number(response.headers.get(HEADER.X_TOTAL_COUNT)) || EMPTY_COUNT;

    console.log(winners, totalWinners);

    return { winners, totalWinners };
  } catch {
    return { winners: [], totalWinners: EMPTY_COUNT };
  }
}

async function getWinner(id: number): Promise<WinnerProperties> {
  const response = await fetch(`${BASE_URL}${PATH.WINNERS}/${String(id)}`);
  const winner: unknown = await response.json();

  assertIsWinnerProperties(winner);

  return winner;
}

async function createWinner(id: number, time: number): Promise<unknown> {
  const response = await fetch(`${BASE_URL}${PATH.WINNERS}`, {
    method: HTTP_METHOD.POST,
    body: JSON.stringify({ id, time, wins: WIN_AMOUNT }),
    headers: { [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON },
  });

  if (response.status !== HTTP_STATUS.CREATED) {
    throw new Error(ERROR_TEXT.CREATE_WINNER);
  }

  return response.json();
}

async function deleteWinner(id: number): Promise<unknown> {
  const response = await fetch(`${BASE_URL}${PATH.WINNERS}/${String(id)}`, {
    method: HTTP_METHOD.DELETE,
  });

  return response.json();
}

async function updateWinner(properties: WinnerProperties): Promise<unknown> {
  const response = await fetch(
    `${BASE_URL}${PATH.WINNERS}/${String(properties.id)}`,
    {
      method: HTTP_METHOD.PUT,
      headers: { [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON },
      body: JSON.stringify({ wins: properties.wins, time: properties.time }),
    }
  );

  if (response.status !== HTTP_STATUS.OK) {
    throw new Error(ERROR_TEXT.UPDATE_WINNER);
  }

  return response.json();
}

export const apiService = {
  getCars,
  getCar,
  createCar,
  deleteCar,
  updateCar,
  startCar,
  driveCar,
  stopCar,
  getWinners,
  getWinner,
  createWinner,
  deleteWinner,
  updateWinner,
};
