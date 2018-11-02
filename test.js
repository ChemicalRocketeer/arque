const assert = require('assert')
const Queue = require('./queue')

let q = new Queue()

assert(q.isEmpty(), 'should start empty')
assert.strictEqual(q.size(), 0)
assert.strictEqual(q.peek(), undefined)
assert.strictEqual(q.deq(), undefined)
assert.strictEqual(q.peek(), undefined)

q.enq('test')
assert(!q.isEmpty(), 'should not stay empty')
assert.strictEqual(q.size(), 1, 'should have size 1 after enq')
assert.strictEqual(q.peek(), 'test')

q.enq('second')
assert.strictEqual(q.size(), 2, 'should have size 1 after second enq')
assert.strictEqual(q.peek(), 'test')

let out = q.deq()
assert.strictEqual(out, 'test', 'deq should return the first enQueued item')
assert.strictEqual(q.size(), 1, 'size should be 1 after deq')
assert.strictEqual(q.peek(), 'second')

out = q.deq()
assert.strictEqual(out, 'second', 'deq should return the second enQueued item')
assert.strictEqual(q.size(), 0, 'size should be 0 after second deq')
assert.strictEqual(q.peek(), undefined)

out = q.deq()
assert.strictEqual(q.size(), 0, 'size should be 0 after redundant deq')
assert.strictEqual(out, undefined)

q = new Queue({ initialCapacity: 2 })
q.enq('a')
q.enq('b')
q.deq()
q.enq('c')
assert.strictEqual(q.size(), 2, 'should be able to enq after deq at max capacity')
q.enq('d')
assert.strictEqual(q.size(), 3, 'should be able to enq beyond capacity')
out = q.deq()
assert.strictEqual('b', out, 'deq should return the first item after enq beyond cap')
q.enq('e')
q.enq('f')
assert.strictEqual(q.size(), 4, 'should be able to enq beyond capacity again')

q = new Queue({ initialCapacity: 2 })
q.enq('a')
q.enq('b')
out = q.deq()
assert.strictEqual(out, 'a')
q.enq('c')
out = q.deq()
assert.strictEqual(out, 'b')
q.enq('d')
out = q.deq()
assert.strictEqual(out, 'c')
q.enq('e')
assert.strictEqual(q.size(), 2)

q = new Queue()
let items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
items.forEach(it => q.enq(it))
assert.strictEqual(q.size(), items.length)

q = new Queue({ initialCapacity: 1 })
assert.strictEqual(q._buf.length, 1, 'should allow an initial capacity')
q.enq('a')
q.enq('b')
assert.strictEqual(q._buf.length, 2)

assert.throws(
  () => new Queue({ initialCapacity: 0 }),
  RangeError,
  'should not allow initialCapacity <= 0'
)

console.log('ok')
