export function isNonNullable<T>(value: T): value is NonNullable<T> {
  return value !== null && value !== undefined;
}

// TODO remove magic string
export function assertIsSVGElement(
  element: Element | null
): asserts element is SVGElement {
  if (!(element instanceof SVGElement)) {
    throw new TypeError('Parsed SVG is not a valid SVGElement');
  }
}
