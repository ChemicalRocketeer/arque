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

function Arque ({ capacity=8 }={}) {
  this._arr = new Array(capacity)
  this._first = 0
  this._size = 0
}

Arque.prototype.enq = function (item) {
  if (this._size === this._arr.length) this._grow()
  let last = this._first + this._size
  if (last >= this._arr.length) last -= this._arr.length
  this._arr[last] = item
  this._size++
}

Arque.prototype.deq = function (item) {
  if (this._size === 0) return undefined
  const length = this._arr.length
  const result = this._arr[this._first]
  if (++this._first >= length) this._first -= length
  this._size--
  return result
}

Arque.prototype.size = function () {
  return this._size
}

Arque.prototype.isEmpty = function () {
  return this._size === 0
}

Arque.prototype._grow = function () {
  // We grow when the array is at max capacity
  const length = this._arr.length
  const newArr = new Array(length * 2)
  for (let i=0, ref=this._first; i < length; i++, ref++) {
    if (ref >= length) ref -= length
    newArr[i] = this._arr[ref]
  }
  this._first = 0
  this._arr = newArr
}
