const BASE_URL = 'http://127.0.0.1:3000';

const PATH = {
  GARAGE: '/garage',
  ENGINE: '/engine',
  WINNERS: '/winners',
};

export async function getCars(): Promise<void> {
  const response = await fetch(`${BASE_URL}${PATH.GARAGE}`);
  const data: unknown = await response.json();

  console.log(data);
}

export async function getCar(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}${PATH.GARAGE}/${String(id)}`);
  const data: unknown = await response.json();

  console.log(data);
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
