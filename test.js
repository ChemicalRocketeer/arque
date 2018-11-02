const assert = require('assert')
const Queue = require('./q')

let q = new Queue()

assert(q.isEmpty(), 'should start empty')
assert.strictEqual(q.size(), 0)
assert.strictEqual(q.front(), undefined)
assert.strictEqual(q.popFront(), undefined)
assert.strictEqual(q.front(), undefined)

q.pushBack('test')
assert(!q.isEmpty(), 'should not stay empty')
assert.strictEqual(q.size(), 1, 'should have size 1 after pushBack')
assert.strictEqual(q.front(), 'test')

q.pushBack('second')
assert.strictEqual(q.size(), 2, 'should have size 1 after second pushBack')
assert.strictEqual(q.front(), 'test')

assert.strictEqual(q.popFront(), 'test', 'popFront should return the first pushBackueued item')
assert.strictEqual(q.size(), 1, 'size should be 1 after popFront')
assert.strictEqual(q.front(), 'second')

assert.strictEqual(q.popFront(), 'second', 'popFront should return the second pushBackueued item')
assert.strictEqual(q.size(), 0, 'size should be 0 after second popFront')
assert.strictEqual(q.front(), undefined)

assert.strictEqual(q.size(), 0, 'size should be 0 after redundant popFront')
assert.strictEqual(q.popFront(), undefined)

assert.throws(
  () => new Queue({ initialCapacity: 0 }),
  RangeError,
  'should not allow initialCapacity <= 0'
)

q = new Queue({ initialCapacity: 2 })
q.pushBack('a')
q.pushBack('b')
q.popFront()
q.pushBack('c')
assert.strictEqual(q.size(), 2, 'should be able to pushBack after popFront at max capacity')
q.pushBack('d')
assert.strictEqual(q.size(), 3, 'should be able to pushBack beyond capacity')
assert.strictEqual('b', q.popFront(), 'popFront should return the first item after pushBack beyond cap')
q.pushBack('e')
q.pushBack('f')
assert.strictEqual(q.size(), 4, 'should be able to pushBack beyond capacity again')

q = new Queue({ initialCapacity: 2 })
q.pushBack('a')
q.pushBack('b')
assert.strictEqual(q.popFront(), 'a')
q.pushBack('c')
assert.strictEqual(q.popFront(), 'b')
q.pushBack('d')
assert.strictEqual(q.popFront(), 'c')
q.pushBack('e')
assert.strictEqual(q.size(), 2)

q = new Queue()
let items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
items.forEach(it => q.pushBack(it))
assert.strictEqual(q.size(), items.length)
items.forEach(it => {
  assert.strictEqual(q.popFront(), it)
})

q = new Queue({ initialCapacity: 1 })
assert.strictEqual(q._buf.length, 1, 'should allow an initial capacity')
q.pushBack('a')
q.pushBack('b')
assert.strictEqual(q._buf.length, 2)

console.log('ok')
