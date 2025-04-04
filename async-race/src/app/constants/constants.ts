export const BASE_URL = 'http://127.0.0.1:3000';

export const PATH = {
  GARAGE: '/garage',
  ENGINE: '/engine',
  WINNERS: '/winners',
} as const;

export const QUERY_PARAMETER = {
  PAGE: '_page',
  LIMIT: '_limit',
} as const;

export const HEADER = {
  CONTENT_TYPE: 'Content-Type',
  X_TOTAL_COUNT: 'X-Total-Count',
} as const;

export const CONTENT_TYPE = {
  JSON: 'application/json',
} as const;

export const HTTP_METHOD = {
  DELETE: 'DELETE',
  POST: 'POST',
  PUT: 'PUT',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
} as const;

export const ERROR_TEXT = {
  GET: 'Failed to retrieve car.',
  CREATE: 'Failed to create car.',
  DELETE: 'Failed to delete car.',
  UPDATE: 'Failed to update car.',
};

export const TAG_NAME = {
  BUTTON: 'button',
  DIALOG: 'dialog',
  DIV: 'div',
  FORM: 'form',
  H1: 'h1',
  INPUT: 'input',
  LI: 'li',
  MAIN: 'main',
  P: 'p',
  SECTION: 'section',
  SPAN: 'span',
  SVG: 'svg',
  UL: 'ul',
} as const;

export const DEFAULT_BUTTON_TYPE = 'button';

export const BUTTON_TEXT = {
  GARAGE: 'Garage',
  WINNERS: 'Winners',

  ADD_CAR: 'Add Car',
  NEXT: 'Next',
  PREVIOUS: 'Previous',

  EDIT: 'Edit',
  DELETE: 'Delete',
  RETURN: 'Return',
  START: 'Start',

  SAVE: 'Save',
} as const;

export const TITLES = {
  GARAGE: 'Garage',
  WINNERS: 'Winners',
} as const;

export const COUNTER_TEXT = 'Total cars: ';

export const PLACEHOLDERS = {
  NAME: 'Enter car name...',
};

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
} as const;

export const INPUT_TYPE = {
  TEXT: 'text',
  COLOR: 'color',
} as const;

export const CAR_ICON_SIZE = {
  WIDTH: '62',
  HEIGHT: '45',
} as const;

export const MIME_TYPE = {
  SVG: 'image/svg+xml',
} as const;

export const EMPTY_STRING = '';
export const EMPTY_COUNT = 0;
export const DEFAULT_INCREMENT = 1;
export const DEFAULT_PAGE = 1;
export const DEFAULT_COLOR = '#FFE338';
export const CARS_PER_PAGE = 7;
export const HEX_BASE = 16;
export const PAD_LENGTH = 2;
export const PAD_VALUE = '0';

export const CAR_PROPERTIES = {
  ID: 'id',
  NAME: 'name',
  COLOR: 'color',
} as const;

export const CAR_MODELS: Record<string, string[]> = {
  Pussla: ['Model X', 'Model S', 'Model 3', 'Model Y', 'Cybertruck'],
  BMeoW: ['i3', 'i4', 'i8', 'M4', 'X5'],
  Meowdi: ['A3', 'A4', 'Q7', 'Q5', 'e-tron'],
  Murcedes: ['A-Class', 'C-Class', 'E-Class', 'S-Class', 'GLC'],
  Furd: ['Mustang', 'F-150', 'Explorer', 'Focus', 'Bronco'],
  Nekoyota: ['Camry', 'Corolla', 'Highlander', 'RAV4', 'Prius'],
  Chevrocat: ['Malibu', 'Impala', 'Tahoe', 'Silverado', 'Bolt EV'],
  Catswagen: ['Golf', 'Pussat', 'Tiguan', 'ID.4', 'Beetle'],
  Nyanssan: ['Altima', 'Maxima', '370Z', 'Leaf', 'Rogue'],
  Subeowru: ['Outback', 'Impreza', 'Forester', 'Crosstrek', 'Legacy'],
  Purrari: ['488 GTB', 'Portofino', 'LaFerrari', 'F8 Tributo', 'GTC4Lusso'],
  Murgatti: ['Chiron', 'Veyron', 'Divo', 'Bolide', 'Chiron Purr Sport'],
};
