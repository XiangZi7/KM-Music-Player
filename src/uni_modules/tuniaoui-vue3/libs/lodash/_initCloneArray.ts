const objectProto = Object.prototype
const hasOwnProperty = objectProto.hasOwnProperty

export function initCloneArray(array: any) {
  const length = array.length
  const result = new array.constructor(length)

  // Add properties assigned by `RegExp#exec`.
  if (
    length &&
    typeof array[0] == 'string' &&
    hasOwnProperty.call(array, 'index')
  ) {
    result.index = array.index
    result.input = array.input
  }
  return result
}
