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
} from '~/app/constants/constants';
import { EngineError } from '~/app/utils/custom-errors';
import {
  assertCarItemPropertiesArray,
  assertIsStartEngineProperties,
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

async function getCar(id: number): Promise<unknown> {
  const response = await fetch(`${BASE_URL}${PATH.GARAGE}/${String(id)}`);

  if (response.status !== HTTP_STATUS.OK) {
    throw new Error(ERROR_TEXT.GET_CAR);
  }

  return response.json();
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

async function driveCar(id: number): Promise<void> {
  const query = new URLSearchParams({
    id: id.toString(),
    status: CAR_STATUS.DRIVE,
  });

  const response = await fetch(
    `${BASE_URL}${PATH.ENGINE}?${query.toString()}`,
    {
      method: HTTP_METHOD.PATCH,
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

async function getWinners(): Promise<void> {
  const response = await fetch(`${BASE_URL}${PATH.WINNERS}`);
  const data: unknown = await response.json();

  console.log(data);
}

async function getWinner(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}${PATH.WINNERS}/${String(id)}`);
  const data: unknown = await response.json();

  console.log(data);
}

async function createWinner(
  id: number,
  wins: number,
  time: number
): Promise<unknown> {
  const response = await fetch(`${BASE_URL}${PATH.WINNERS}`, {
    method: HTTP_METHOD.POST,
    body: JSON.stringify({ id, wins, time }),
    headers: { [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON },
  });

  if (response.status !== HTTP_STATUS.CREATED) {
    throw new Error(ERROR_TEXT.CREATE_WINNER);
  }

  return response.json();
}

async function deleteWinner(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}${PATH.WINNERS}/${String(id)}`, {
    method: HTTP_METHOD.DELETE,
  });

  if (response.status !== HTTP_STATUS.OK) {
    throw new Error(ERROR_TEXT.DELETE_WINNER);
  }
}

async function updateWinner(properties: WinnerProperties): Promise<unknown> {
  const response = await fetch(
    `${BASE_URL}${PATH.WINNERS}/${String(properties.id)}`,
    {
      method: HTTP_METHOD.PUT,
      headers: { [HEADER.CONTENT_TYPE]: CONTENT_TYPE.JSON },
      body: JSON.stringify({ wins: properties.wins, time: properties.wins }),
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
