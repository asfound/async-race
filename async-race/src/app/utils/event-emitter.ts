import type { State } from '../types/interfaces';
import type { Listener } from '../types/types';

export class EventEmitter {
  private readonly events = new Map<string, Listener[]>();

  public subscribe(event: string, callback: Listener): void {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event)?.push(callback);
  }

  public unsubscribe(event: string, callback: Listener): void {
    const listeners = this.events.get(event);
    if (listeners) {
      this.events.set(
        event,
        listeners.filter((_callback) => _callback !== callback)
      );
    }
  }

  public emit(event: string, data: State): void {
    const listeners = this.events.get(event);
    if (listeners) {
      for (const callback of listeners) {
        callback(data);
      }
    }
  }
}
