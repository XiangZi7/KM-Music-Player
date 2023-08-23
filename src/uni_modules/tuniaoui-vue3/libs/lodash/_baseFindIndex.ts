export function baseFindIndex(
  array: string[],
  predicate: (...args: any[]) => boolean,
  fromIndex: number,
  fromRight = false
) {
  const length = array.length
  let index = fromIndex + (fromRight ? 1 : -1)

  while (fromRight ? index-- : ++index < length) {
    if (predicate(array[index], index, array)) {
      return index
    }
  }
  return -1
}
