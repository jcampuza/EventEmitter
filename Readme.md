# EventEmitter.js

A simple pub/sub event system for use with Javascript projects. Framework agnostic and relatively small size.
Currently supported in environments that support the 'import' syntax since thats my use case.

Usage

```javascript

import EventEmitter from './EventEmitter';

EventEmitter.subscribe('log', (message) => {
	console.log(message);
})

EventEmitter.publish('log', 'Hi from publish');
// logs to the console -- 'Hi from publish'

```

Also has support for handling asynchronous subscribers/publishing through the use of 
EventEmitter.asyncPublish. There were use cases were I had to wait for subscribers that ran
asynchronous code and run some code after all of the async code had resolved. 

Usage

```javascript

import EventEmitter from './EventEmitter';

function delayedHi(ms) {
	return new Promise(resolve => {
		window.setTimeout(() => {
			console.log('hi')
			return resolve();
		}, ms)
	})
}

EventEmitter.subscribe('log', () => {
	return delayedHi(1000);
})

EventEmitter.subscribe('log', () => {
	return delayedHi(2000);
})

EventEmitter.publishAsync('log').then(() => {
	console.log('goodbye');
})
// logs 'hi' after 1000ms
// logs 'hi' after 2000ms
// logs 'goodbye'
```

Remember to dispose of your subscribers when they are no longer needed :)

```javascript

import EventEmitter from './EventEmitter';

const subscriber = EventEmitter.subscribe('log', () => {
	console.log('hi');
})

EventEmitter.publish('log');

subscriber.dispose();

```