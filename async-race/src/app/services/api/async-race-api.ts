const BASE_URL = 'http://127.0.0.1:3000';

const PATH = {
  GARAGE: '/garage',
  ENGINE: '/engine',
  WINNERS: '/winners',
};

export const getCars = async (): Promise<void> => {
  const response = await fetch(`${BASE_URL}${PATH.GARAGE}`);
  const data: unknown = await response.json();

  console.log(data);
};
