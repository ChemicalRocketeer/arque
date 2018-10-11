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

module.exports = function arque ({ capacity=8, fillValue }={}) {
  let arr = new Array(capacity)
  let first = 0
  let size = 0

  const grow = () => {
    // We grow when the array is at max capacity
    const length = arr.length
    const newLength = length * 2
    const newArr = new Array(newLength)
    for (let i=0; i < length; i++, first++) {
      // using first here instead of allocating another variable...
      // we are just going to set it to 0 later anyway
      if (first >= length) first -= length
      newArr[i] = arr[first]
    }
    if (fillValue !== undefined) {
      fill(newArr, fillValue, length)
    }
    first = 0
    arr = newArr
  }

  return {
    enq: (item) => {
    	const length = arr.length
      if (size === length) grow()
      let last = first + size
      if (last > length) last -= length
      arr[last] = item
      size++
    },
    deq: () => {
      if (size === 0) return undefined
      const length = arr.length
      const result = arr[first]
      if (++first > length) first -= length
      size--
      return result
    },
    size: () => size,
    isEmpty: () => size === 0,
  }
}

// because native fill isn't fast enough
function fill (arr, value, start) {
  const length = arr.length
  if (start === undefined) start = 0
  for (let i = start; i < length; i++) {
    arr[i] = value
  }
  return arr
}
