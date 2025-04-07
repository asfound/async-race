export enum EventType {
  PAGE_CHANGE,
  COUNT_CHANGE,

  GARAGE_STATUS_CHANGE,
  WINNERS_PAGE_CHANGE,
}

export enum CarEventType {
  STATUS_CHANGE,
  PROPERTIES_CHANGE,
}

export enum SortField {
  ID = 'id',
  WINS = 'wins',
  TIME = 'time',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum GarageStatus {
  RACING,
  READY,
  CARS_LEFT,
}
