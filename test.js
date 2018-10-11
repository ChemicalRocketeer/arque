const assert = require('assert')
const queue = require('./queue')

let q = queue()

assert(q.isEmpty(), 'should start empty')
assert.strictEqual(q.size(), 0)

q.enq('test')
assert(!q.isEmpty(), 'should not stay empty')
assert.strictEqual(q.size(), 1, 'should have size 1 after enq')

q.enq('second')
assert.strictEqual(q.size(), 2, 'should have size 1 after second enq')

let out = q.deq()
assert.strictEqual(out, 'test', 'deq should return the first enqueued item')
assert.strictEqual(q.size(), 1, 'size should be 1 after deq')

q = queue({ capacity: 2 })
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

q = queue({ capacity: 2 })
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

q = queue()
let items = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i']
items.forEach(it => q.enq(it))
assert.strictEqual(q.size(), items.length)

console.log('ok')
