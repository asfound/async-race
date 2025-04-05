import type {
  CarItemProperties,
  StartEngineProperties,
} from '../types/interfaces';

import { CAR_PROPERTIES } from '../constants/constants';

export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

// TODO remove magic strings
export function assertIsSVGElement(
  element: Element | null
): asserts element is SVGElement {
  if (!(element instanceof SVGElement)) {
    throw new TypeError('Parsed SVG is not a valid SVGElement');
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
    throw new TypeError(`Not valid CarItemProperties values`);
  }
}

export function assertIsArray<T>(object: unknown): asserts object is T[] {
  if (!Array.isArray(object)) {
    throw new TypeError('Not array');
  }
}

export function assertCarItemPropertiesArray(
  data: unknown
): asserts data is CarItemProperties[] {
  if (
    !Array.isArray(data) ||
    !data.every((object) => isCarItemProperties(object))
  ) {
    throw new Error('Not valid CarItemProperties values or not an array');
  }
}

function isStartEngineProperties(
  object: unknown
): object is StartEngineProperties {
  const isObject = typeof object !== 'object' || object === null;

  if (isObject || !('velocity' in object) || !('distance' in object)) {
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
    throw new TypeError(`Not valid StartEngineProperties values`);
  }
}
