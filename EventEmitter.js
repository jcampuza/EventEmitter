// loosely based off of: https://github.com/aurelia/event-aggregator/blob/master/src/index.js

class EventEmitter {

	// EventLookups
	constructor() {
		this.eventLookup = {};
	}

	/**
	 * Publish an event with a payload data
	 * @param {string} event 
	 * @param {any} data 
	 */
	publish(event, data) {
		let subscribers;
		let i;

		if (!event) {
			throw new Error('Event was invalid');
		}

		subscribers = this.eventLookup[event];
		if (subscribers) {
			subscribers = subscribers.slice();
			i = subscribers.length;

			// invoke listeners in order
			while (i--) {
				subscribers[i](data, event);
			}
		}
	}

	/**
	 * Publish an async event, this allows us to chain .then, .catch, etc in order to detect when all events have completed
	 * being handled
	 * @param {string} event 
	 * @param {any} data 
	 */
	publishAsync(event, data) {
		let subscribers;
		let asyncCallbacks;

		if (!event) {
			throw new Error('Event was invalid');
		}

		subscribers = this.eventLookup[event];
		if (subscribers) {
			subscribers = subscribers.slice();

			asyncCallbacks = subscribers.map(sub => typeof sub.then === 'function' ? sub(data, event) : Promise.resolve(sub(data, event)));

			return Promise.all(asyncCallbacks);
		} else {
			return Promise.resolve();
		}
	}

	/**
	 * subscribe to event with specified callback
	 * @param {string} event 
	 * @param {Function} callback 
	 */
	subscribe(event, callback) {
		let handler, subscribers;

		if (!event) {
			throw new Error('Event/Subscription name was invalid');
		}

		handler = callback;

		// Either grab existing subscribers, or assign and set to new array
		subscribers = this.eventLookup[event] || (this.eventLookup[event] = []);
		subscribers.push(handler);

		// return object that allows us to dispose of a subscriber
		return {
			dispose() {
				let idx = subscribers.indexOf(handler);
				if (idx !== -1) {
					subscribers.splice(idx, 1);
				}
			}
		}
	}
}

// Export singleton PubSub
export default new EventEmitter();
export { EventEmitter }