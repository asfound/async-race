export const BASE_URL = 'http://127.0.0.1:3000';

export const PATH = {
  GARAGE: '/garage',
  ENGINE: '/engine',
  WINNERS: '/winners',
} as const;

export const QUERY_PARAMETER = {
  PAGE: '_page',
  LIMIT: '_limit',
  SORT: '_sort',
  ORDER: '_order',
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
  PATCH: 'PATCH',
  POST: 'POST',
  PUT: 'PUT',
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_TEXT = {
  GET_CAR: 'Failed to retrieve car.',
  CREATE_CAR: 'Failed to create car.',
  DELETE_CAR: 'Failed to delete car.',
  UPDATE_CAR: 'Failed to update car.',
  START: 'Failed to start engine.',
  STOP: 'Failed to stop car.',

  CREATE_WINNER: 'Failed to create winner.',
  UPDATE_WINNER: 'Failed to update winner.',

  UNKNOWN: 'Unknown error',

  NOT_ARRAY: 'Object is not array',
  NOT_SVG: 'Parsed SVG is not a valid SVGElement',
  NOT_CAR_PROPERTIES: 'Not valid CarItemProperties values',
  NOT_ENGINE_PROPERTIES: 'Not valid StartEngineProperties values',
  NOT_WINNER_PROPERTIES: 'Not valid WinnerProperties values',
};

export const CAR_STATUS = {
  STARTED: 'started',
  DRIVE: 'drive',
  STOPPED: 'stopped',
} as const;

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
  TABLE: 'table',
  TBODY: 'tbody',
  THEAD: 'thead',
  TD: 'td',
  TH: 'th',
  TR: 'tr',
  UL: 'ul',
} as const;

export const BUTTON_TYPE = {
  BUTTON: 'button',
  SUBMIT: 'submit',
} as const;

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

export const COUNTER_TEXT = {
  CARS: 'Total cars: ',
  WINNERS: 'Total winners: ',
};

export const PLACEHOLDER = {
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

export const REPAIR_ICON_SIZE = {
  WIDTH: '31',
  HEIGHT: '22',
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

export const MILLISECONDS = 1000;
export const TIME_PRECISION = 2;

export const WIN_AMOUNT = 1;
export const WINNERS_PER_PAGE = 10;

export const CAR_PROPERTIES = {
  ID: 'id',
  NAME: 'name',
  COLOR: 'color',
} as const;

export const ENGINE_PROPERTIES = {
  VELOCITY: 'velocity',
  DISTANCE: 'distance',
} as const;

export const WINNER_PROPERTIES = {
  ID: 'id',
  WINS: 'wins',
  TIME: 'time',
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
