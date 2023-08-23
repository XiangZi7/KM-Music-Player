export function arrayReduce(
  array: any,
  iteratee: any,
  accumulator: any,
  initAccum?: any
) {
  let index = -1
  const length = array ? array.length : 0

  if (initAccum && length) {
    accumulator = array[++index]
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array)
  }
  return accumulator
}
