export function baseSlice(array: string[], start: number, end: number) {
  let index = -1
  let length = array.length

  if (start < 0) {
    start = -start > length ? 0 : length + start
  }
  end = end > length ? length : end
  if (end < 0) {
    end += length
  }
  length = start > end ? 0 : (end - start) >>> 0
  start >>>= 0

  const result = Array.from({ length })
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}
