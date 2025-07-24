export enum Route {
  GARAGE = 'garage',
  WINNERS = 'winners',
}

export function routeFromString(value: string): Route | null {
  switch (value) {
    case 'garage': {
      return Route.GARAGE;
    }
    case 'winners': {
      return Route.WINNERS;
    }
    default: {
      return null;
    }
  }
}
