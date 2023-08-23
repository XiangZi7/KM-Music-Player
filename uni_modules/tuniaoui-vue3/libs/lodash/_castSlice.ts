import { baseSlice } from './_baseSlice'

export function castSlice(array: string[], start: number, end: number) {
  const length = array.length
  end = end === undefined ? length : end
  return !start && end >= length ? array : baseSlice(array, start, end)
}
