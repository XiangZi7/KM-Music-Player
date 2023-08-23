export function copyArray(source: any, array: any) {
  let index = -1
  const length = source.length

  array || (array = Array.from({ length }))
  while (++index < length) {
    array[index] = source[index]
  }
  return array
}
