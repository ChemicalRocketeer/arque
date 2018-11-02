# Arque

Arque is a Javascript deque implementation focused on being as fast as possible.
So far it is the fastest JS queue I have been able to find.

```js
const tasks = new Arque()

tasks.isEmpty()   // true
tasks.pushBack('buy groceries')
tasks.pushBack('do taxes')
tasks.size()      // 2
tasks.peekFront() // 'buy groceries'
tasks.popFront()  // 'buy groceries'
tasks.size()      // 1
tasks.popFront()  // 'do taxes'
tasks.popFront()  // undefined
```

More usage examples available in test.js

## Implementation

Arque is implemented with an array used as a circular buffer.
If you enqueue items at the same rate they are dequeued,
the internal buffer will never be re-allocated.

When you enqueue more items than will fit in the internal buffer,
a new buffer will be allocated that is twice as big.

An `enq` that happens to trigger buffer growth will individually be O(n),
but since the queue capacity doubles each time this happens,
the amortized performance of _n_ `enq` operations is O(1).

## Planned Features

- Currently, the internal buffer never decreases in size, to avoid unnecessary work.
  I'd like to add auto-shrinking as the default behavior, with an option to never shrink.

- An option for a minimum buffer size (after adding shrinkage)

- An option to never grow.

- Ability to supply initial values

- Benchmarks with alternative implementations living directly in this project
  and run on CI

- Make it fantasyland compatible

- Sensible method aliases
