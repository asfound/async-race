import { TAG_NAME } from '~/app/constants/constants';

import { isNonNullable } from './type-guards';

export type TagType = keyof HTMLElementTagNameMap;

type Properties<T extends TagType> = Partial<HTMLElementTagNameMap[T]>;

type Attributes = Record<string, string>;

type ChildNode = Node | string | null | undefined;

function createElementFactory<T extends TagType>(tag: T) {
  return function createElement(
    properties?: Properties<T>,

    children?: ChildNode[],

    attributes?: Attributes
  ): HTMLElementTagNameMap[T] {
    const element = document.createElement(tag);

    if (properties) {
      Object.assign(element, properties);
    }

    if (attributes) {
      for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
      }
    }

    if (children) {
      element.append(...children.filter((child) => isNonNullable(child)));
    }

    return element;
  };
}

export const button = createElementFactory(TAG_NAME.BUTTON);

export const div = createElementFactory(TAG_NAME.DIV);

export const li = createElementFactory(TAG_NAME.LI);

export const main = createElementFactory(TAG_NAME.MAIN);

export const p = createElementFactory(TAG_NAME.P);

export const span = createElementFactory(TAG_NAME.SPAN);

export const ul = createElementFactory(TAG_NAME.UL);
