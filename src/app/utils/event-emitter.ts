import type { Listener } from '../types/types';

export class EventEmitter<T, E> {
  private readonly events = new Map<E, Listener<T>[]>();

  public subscribe(event: E, callback: Listener<T>): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)?.push(callback);
  }

  public unsubscribe(event: E, callback: Listener<T>): void {
    const listeners = this.events.get(event);
    if (listeners) {
      this.events.set(
        event,
        listeners.filter((_callback) => _callback !== callback)
      );
    }
  }

  public unsubscribeAll(): void {
    this.events.clear();
  }

  public emit(event: E, data: T): void {
    const listeners = this.events.get(event);
    if (listeners) {
      for (const callback of listeners) {
        callback(data);
      }
    }
  }
}
