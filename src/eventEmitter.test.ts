import { EventEmitter } from './eventEmitter';

describe('event emitter', () => {
  it('should create an instance correctly', () => {
    const emitter = new EventEmitter();

    expect(emitter).toBeInstanceOf(EventEmitter);
  });

  it('should throw when event name is not specified correctly', () => {
    const emitter = new EventEmitter();
    let throws = false;

    try {
      emitter.on('', () => {
        return 0;
      });
    } catch {
      throws = true;
    }

    expect(throws).toEqual(true);
  });

  it('should should throw when event callback is not specified correctly', () => {
    const emitter = new EventEmitter();
    let throws = false;

    try {
      // @ts-ignore
      emitter.on('event', undefined);
    } catch {
      throws = true;
    }

    expect(throws).toEqual(true);
  });

  it('should add events correctly', () => {
    const emitter = new EventEmitter();

    emitter.on('event', () => {
      return 0;
    });
  });

  it('should throw when events are not emitted correctly', () => {
    const emitter = new EventEmitter();
    let throws = false;

    try {
      // @ts-ignore
      emitter.emit('');
    } catch {
      throws = true;
    }

    expect(throws).toEqual(true);
  });

  it('should trigger events correctly', () => {
    const emitter = new EventEmitter();
    const mock = jest.fn();

    emitter.on('event', mock);
    emitter.emit('event');

    expect(mock).toHaveBeenCalled();
  });

  it('should trigger events correctly when multiple are attached to the same namespace', () => {
    const emitter = new EventEmitter();
    const mock = jest.fn();

    emitter.on('event', mock);
    emitter.on('event', mock);
    emitter.emit('event');

    expect(mock).toHaveBeenCalledTimes(2);
  });

  it('should dispose of event handlers correctly', () => {
    const emitter = new EventEmitter();
    const mock = jest.fn();

    const dispose = emitter.on('event', mock);
    dispose();
    emitter.emit('event');

    expect(mock).not.toHaveBeenCalled();
  });

  it('should not fail when calling dispose after an event is already disposed', () => {
    const emitter = new EventEmitter();
    const mock = jest.fn();

    const dispose = emitter.on('event', mock);
    emitter.off('event');
    dispose();
  });

  it('should throw when calling off without an event', () => {
    const emitter = new EventEmitter();
    let throws = false;

    try {
      emitter.off('');
    } catch {
      throws = true;
    }

    expect(throws).toEqual(true);
  });
  it('should remove all handlers when calling `off`', () => {
    const emitter = new EventEmitter();
    const mock = jest.fn();

    emitter.on('event', mock);
    emitter.on('event', mock);
    emitter.on('event', mock);

    emitter.off('event');
    emitter.emit('event');

    expect(mock).not.toHaveBeenCalled();
  });
});
