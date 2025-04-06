import type {
  CarItemProperties,
  StartEngineProperties,
  WinnerProperties,
} from '../types/interfaces';

import {
  CAR_PROPERTIES,
  ENGINE_PROPERTIES,
  ERROR_TEXT,
  WINNER_PROPERTIES,
} from '../constants/constants';

export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

export function assertIsSVGElement(
  element: Element | null
): asserts element is SVGElement {
  if (!(element instanceof SVGElement)) {
    throw new TypeError(ERROR_TEXT.NOT_SVG);
  }
}

function isCarItemProperties(object: unknown): object is CarItemProperties {
  const isObject = typeof object !== 'object' || object === null;

  if (
    isObject ||
    !(CAR_PROPERTIES.ID in object) ||
    !(CAR_PROPERTIES.NAME in object) ||
    !(CAR_PROPERTIES.COLOR in object)
  ) {
    return false;
  }

  return (
    typeof object.id === 'number' ||
    typeof object.name === 'string' ||
    typeof object.color === 'string'
  );
}

export function assertIsCarItemProperties(
  object: unknown
): asserts object is CarItemProperties {
  if (!isCarItemProperties(object)) {
    throw new TypeError(ERROR_TEXT.NOT_CAR_PROPERTIES);
  }
}

export function assertIsArray<T>(object: unknown): asserts object is T[] {
  if (!Array.isArray(object)) {
    throw new TypeError(ERROR_TEXT.NOT_ARRAY);
  }
}

export function assertCarItemPropertiesArray(
  data: unknown
): asserts data is CarItemProperties[] {
  if (
    !Array.isArray(data) ||
    !data.every((object) => isCarItemProperties(object))
  ) {
    throw new TypeError(
      `${ERROR_TEXT.NOT_CAR_PROPERTIES} or ${ERROR_TEXT.NOT_ARRAY}`
    );
  }
}

function isStartEngineProperties(
  object: unknown
): object is StartEngineProperties {
  const isObject = typeof object !== 'object' || object === null;

  if (
    isObject ||
    !(ENGINE_PROPERTIES.VELOCITY in object) ||
    !(ENGINE_PROPERTIES.DISTANCE in object)
  ) {
    return false;
  }

  return (
    typeof object.velocity === 'number' || typeof object.distance === 'number'
  );
}

export function assertIsStartEngineProperties(
  object: unknown
): asserts object is StartEngineProperties {
  if (!isStartEngineProperties(object)) {
    throw new TypeError(ERROR_TEXT.NOT_ENGINE_PROPERTIES);
  }
}

function isWinnerProperties(object: unknown): object is WinnerProperties {
  const isObject = typeof object !== 'object' || object === null;

  if (
    isObject ||
    !(WINNER_PROPERTIES.ID in object) ||
    !(WINNER_PROPERTIES.WINS in object) ||
    !(WINNER_PROPERTIES.TIME in object)
  ) {
    return false;
  }

  return (
    typeof object.id === 'number' ||
    typeof object.wins === 'number' ||
    typeof object.time === 'number'
  );
}

export function assertIsWinnerProperties(
  object: unknown
): asserts object is WinnerProperties {
  if (!isWinnerProperties(object)) {
    throw new TypeError(ERROR_TEXT.NOT_WINNER_PROPERTIES);
  }
}
