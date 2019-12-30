# EventEmitter.js

A simple pub/sub event bus for use with JS/TS projects.

Usage

```javascript
import { EventEmitter } from 'event-emitter';

const emitter = new EventEmitter();

emitter.on('log', message => {
  console.log(message);
});

emitter.event('log', 'Hi from publish');
// logs to the console -- 'Hi from publish'
```

Remember to dispose of your subscribers when they are no longer needed

```javascript
import { EventEmitter } from 'event-emitter';

const emitter = new emitter();

const unsubscribe = emitter.on('log', () => {
  console.log('hi');
});

emitter.emit('log');

unsubscribe();
```

You can also dispose of all subscribers on a namespace

```javascript
import { EventEmitter } from 'event-emitter';

const emitter = new EventEmitter();
const log = () => console.log('hi');

emitter.on('log', log);
emitter.on('log', log);
emitter.on('log', log);
emitter.on('log', log);

emitter.off('log');

emitter.emit('log');
// No events are fired
```
