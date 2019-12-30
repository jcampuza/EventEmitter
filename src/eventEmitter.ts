export type EventCallback = (data?: any) => void;

export class EventEmitter {
  eventLookup: Record<string, EventCallback[]> = {};

  /**
   * Triggers all event handlers currently subscribed to the passed event namespace with the provided data
   */
  emit(event: string, data?: any) {
    if (!event) {
      throw new Error('Event is required to emit');
    }

    const subscribers = this.eventLookup[event];

    if (!subscribers) {
      return;
    }

    for (const subscriber of subscribers) {
      subscriber(data);
    }
  }

  /**
   * Subscribes a handler to the provided namespace
   *
   * Returns a dispose function that will unsubscribe the event
   */
  on(event: string, eventHandler: EventCallback) {
    if (!event) {
      throw new Error('Event type is required');
    }

    if (typeof eventHandler !== 'function') {
      throw new Error('Provided handler must be a function');
    }

    const subscribers = this.eventLookup[event] || [];

    this.eventLookup[event] = [...subscribers, eventHandler];

    return () => {
      if (this.eventLookup[event]) {
        this.eventLookup[event] = this.eventLookup[event].filter(
          handler => handler !== eventHandler
        );
      }
    };
  }

  off(event: string) {
    if (!event) {
      throw new Error('Event type is required');
    }

    delete this.eventLookup[event];
  }
}
