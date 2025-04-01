export const TAG_NAME = {
  BUTTON: 'button',
  DIV: 'div',
  LI: 'li',
  MAIN: 'main',
  P: 'p',
  SVG: 'svg',
  UL: 'ul',
} as const;

export const EVENT_NAME = {
  CLICK: 'click',
} as const;

export const DEFAULT_BUTTON_TYPE = 'button';

export const BUTTON_TEXT_CONTENT = {
  GARAGE: 'Garage',
  WINNERS: 'Winners',

  EDIT: 'Edit',
  DELETE: 'Delete',
  RETURN: 'Return',
  START: 'Start',
} as const;

export const COLOR_MODEL: string[] = ['red', 'green', 'blue'];

export const COLOR_RANGE = {
  MIN: 0,
  MAX_RANDOM: 250,
  MAX: 255,
  OFFSET: 1,
} as const;

export const ATTRIBUTE = {
  WIDTH: 'width',
  HEIGHT: 'height',
  FILL: 'fill',
};

export const CAR_ICON_SIZE = {
  WIDTH: '62',
  HEIGHT: '45',
} as const;

export const MIME_TYPE = {
  SVG: 'image/svg+xml',
} as const;

export const EMPTY_STRING = '';
export const DEFAULT_NUMBER_VALUE = 0;
export const HEX_BASE = 16;
export const PAD_LENGTH = 2;
export const PAD_VALUE = '0';

export const CAR_MODELS: Record<string, string[]> = {
  Tesla: ['Model X', 'Model S', 'Model 3', 'Model Y', 'Cybertruck'],
  BMW: ['i3', 'i4', 'i8', 'M4', 'X5'],
  Audi: ['A3', 'A4', 'Q7', 'Q5', 'e-tron'],
  Mercedes: ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLC'],
  Ford: ['Mustang', 'F-150', 'Explorer', 'Focus', 'Bronco'],
  Toyota: ['Camry', 'Corolla', 'Highlander', 'RAV4', 'Prius'],
  Chevrolet: ['Malibu', 'Impala', 'Tahoe', 'Silverado', 'Bolt EV'],
  Volkswagen: ['Golf', 'Passat', 'Tiguan', 'ID.4', 'Beetle'],
  Nissan: ['Altima', 'Maxima', '370Z', 'Leaf', 'Rogue'],
  Subaru: ['Outback', 'Impreza', 'Forester', 'Crosstrek', 'Legacy'],
  Ferrari: ['488 GTB', 'Portofino', 'LaFerrari', 'F8 Tributo', 'GTC4Lusso'],
  Bugatti: ['Chiron', 'Veyron', 'Divo', 'Bolide', 'Chiron Pur Sport'],
};
