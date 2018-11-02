# Arque

Arque is a Javascript queue implementation focused on being as fast as possible.
It is the fastest JS queue I have been able to find.

```js
const tasks = new Arque()

tasks.isEmpty() // true
tasks.enq('buy groceries')
tasks.enq('do taxes')
tasks.size()    // 2
tasks.peek()    // 'buy groceries'
tasks.deq()     // 'buy groceries'
tasks.size()    // 1
tasks.deq()     // 'do taxes'
tasks.deq()     // undefined
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

- An option for a minimum buffer size

- An option for a fixed-size queue, that rejects additional `enq` operations if it is full.

- Benchmarks with alternative implementations living directly in this project
