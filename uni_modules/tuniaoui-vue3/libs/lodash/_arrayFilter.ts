export function arrayFilter(array: any, predicate: any) {
  let index = -1
  const length = array == null ? 0 : array.length
  let resIndex = 0
  const result = []

  while (++index < length) {
    const value = array[index]
    if (predicate(value, index, array)) {
      result[resIndex++] = value
    }
  }
  return result
}
