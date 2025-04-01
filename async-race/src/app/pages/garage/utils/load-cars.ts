import type { CarItemProperties } from '~/app/types/interfaces';

import { getCars } from '~/app/services/api/async-race-api';

export async function loadCars(): Promise<{
  cars: CarItemProperties[];
  totalCount: number;
}> {
  try {
    return await getCars();
  } catch {
    return { cars: [], totalCount: 0 };
  }
}
