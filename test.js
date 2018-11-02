const assert = require('assert')
const Queue = require('./q')

let q = new Queue()

assert(q.isEmpty(), 'should start empty')
assert.strictEqual(q.size(), 0)
assert.strictEqual(q.peekFront(), undefined)
assert.strictEqual(q.peekBack(), undefined)
assert.strictEqual(q.popFront(), undefined)
assert.strictEqual(q.popBack(), undefined)

q.pushBack('test')
assert(!q.isEmpty(), 'should not stay empty')
assert.strictEqual(q.size(), 1, 'should have size 1 after pushBack')
assert.strictEqual(q.peekFront(), 'test')
assert.strictEqual(q.peekBack(), 'test')

q.pushBack('second')
assert.strictEqual(q.size(), 2, 'should have size 1 after second pushBack')
assert.strictEqual(q.peekFront(), 'test')
assert.strictEqual(q.peekBack(), 'second')

assert.strictEqual(q.popFront(), 'test', 'popFront should return the first pushBackueued item')
assert.strictEqual(q.size(), 1, 'size should be 1 after popFront')
assert.strictEqual(q.peekFront(), 'second')

assert.strictEqual(q.popFront(), 'second', 'popFront should return the second pushBackueued item')
assert.strictEqual(q.size(), 0, 'size should be 0 after second popFront')
assert.strictEqual(q.peekFront(), undefined)

assert.strictEqual(q.size(), 0, 'size should be 0 after redundant popFront')
assert.strictEqual(q.popFront(), undefined)

q = new Queue({ initialCapacity: 1 })
assert.strictEqual(q._buf.length, 1, 'should allow an initial capacity')
q.pushBack('a')
q.pushBack('b')
assert.strictEqual(q._buf.length, 2)

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

q = new Queue()
items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
items.forEach(it => q.pushBack(it))
assert.strictEqual(q.size(), items.length)
items.reverse().forEach(it => {
  assert.strictEqual(q.popBack(), it)
})

q = new Queue()
items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
items.forEach(it => q.pushFront(it))
assert.strictEqual(q.size(), items.length)
items.forEach(it => {
  assert.strictEqual(q.popBack(), it)
})

q = new Queue({ initialCapacity: 5 })
q.pushFront('c')
q.pushBack('d')
q.pushFront('b')
q.pushBack('e')
q.pushFront('a')
q.pushBack('f')
assert.strictEqual(q.size(), 6)
;['a', 'b', 'c', 'd', 'e', 'f'].forEach(it => {
  assert.strictEqual(q.popFront(), it)
})

q = new Queue({ initialCapacity: 5 })
q.pushBack('d')
q.pushFront('c')
q.pushBack('e')
q.pushFront('b')
q.pushBack('f')
q.pushFront('a')
assert.strictEqual(q.size(), 6)
;['a', 'b', 'c', 'd', 'e', 'f'].forEach(it => {
  assert.strictEqual(q.popFront(), it)
})

console.log('ok')
