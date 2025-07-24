import {
  COLOR_MODEL,
  COLOR_RANGE,
  HEX_BASE,
  PAD_LENGTH,
  PAD_VALUE,
} from '../constants/constants';

export function getRandomColor(): string {
  const colorValues = COLOR_MODEL.map(
    () =>
      Math.floor(
        Math.random() *
          (COLOR_RANGE.MAX_RANDOM - COLOR_RANGE.MIN + COLOR_RANGE.OFFSET)
      ) + COLOR_RANGE.MIN
  );

  const randomIndex = Math.floor(Math.random() * COLOR_MODEL.length);

  colorValues[randomIndex] = COLOR_RANGE.MAX;

  const hexValue = colorValues
    .map((value) => value.toString(HEX_BASE).padStart(PAD_LENGTH, PAD_VALUE))
    .join('');

  return `#${hexValue}`;
}
