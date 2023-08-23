export function strictIndexOf(
  array: string[],
  value: string,
  fromIndex: number
) {
  let index = fromIndex - 1
  const length = array.length

  while (++index < length) {
    if (array[index] === value) {
      return index
    }
  }
  return -1
}
