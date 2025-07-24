import { ATTRIBUTE, MIME_TYPE, TAG_NAME } from '../constants/constants';
import { assertIsSVGElement } from './type-guards';

export function createSVGElement(
  svgString: string,
  color: string,
  width: string,
  height: string
): SVGElement {
  const parser = new DOMParser();
  const document = parser.parseFromString(svgString, MIME_TYPE.SVG);
  const svgElement = document.querySelector(TAG_NAME.SVG);

  assertIsSVGElement(svgElement);

  svgElement.setAttribute(ATTRIBUTE.WIDTH, width);
  svgElement.setAttribute(ATTRIBUTE.HEIGHT, height);

  svgElement.setAttribute(ATTRIBUTE.FILL, color);

  return svgElement;
}
