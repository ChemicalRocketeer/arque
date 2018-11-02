/**
 * This array-based queue is implemented using an array
 * that is treated as "circular". As items are dequeued,
 * spaces open up  at the beginning of the array.
 * As more items are enqueued, eventually
 * the array runs out of right-side space,
 * and the `next` index will "wrap around"
 * to the front of the array. If items are enqueued
 * and dequeued at the same rate, `first` and `next`
 * will continue to traverse the array continuously.
 * If more items are enqueued than dequeued, the array
 * will be resized to handle the increased space needs.
 * The array will double in size each time it resizes,
 * resulting in O(1)+ time complexity overall.
 *
 * A fill value can be provided that will be used to
 * fill the extra internal array values when it is resized.
 * This can be useful to allow the JS engine to
 * optimize the array. For example, if you have a queue of
 * integers, you might supply `{ fillValue: 0 }` to ensure
 * that the array is always filled with integers.
 */

module.exports = Arque

function Arque ({ initialCapacity=8 }={}) {
  if (initialCapacity <= 0 ) throw new RangeError('Invalid queue capacity')
  this._buf = new Array(initialCapacity)
  this._first = 0
  this._size = 0
}

Arque.prototype.pushBack = function (item) {
  let buf = this._buf
  let capacity = buf.length
  const size = this._size
  if (size === capacity) {
    // grow when the array is at max capacity
    const oldBuf = buf
    capacity *= 2
    buf = this._buf = new Array(capacity)
    for (let i=0, ref=this._first; i < capacity; i++, ref++) {
      if (ref >= capacity) ref -= capacity
      buf[i] = oldBuf[ref]
    }
    this._first = 0
  }
  let lastIndex = this._first + size
  if (lastIndex >= capacity) lastIndex -= capacity
  buf[lastIndex] = item
  this._size++
}

Arque.prototype.popFront = function () {
  if (this._size === 0) return undefined
  const length = this._buf.length
  const result = this._buf[this._first]
  if (++this._first >= length) this._first -= length
  this._size--
  return result
}
Arque.prototype.shift = Arque.prototype.popFront

Arque.prototype.front = function () {
  if (this._size === 0) return undefined
  return this._buf[this._first]
}

Arque.prototype.back = function () {
  const size = this._size
  if (size === 0) return undefined
  return this._buf[this._first + size]
}

Arque.prototype.size = function () {
  return this._size
}

Arque.prototype.isEmpty = function () {
  return this._size === 0
}