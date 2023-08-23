import { baseFindIndex } from './_baseFindIndex'
import { baseIsNaN } from './_baseIsNan'
import { strictIndexOf } from './_strictIndexOf'

export function baseIndexOf(array: string[], value: string, fromIndex: number) {
  return value === value
    ? strictIndexOf(array, value, fromIndex)
    : baseFindIndex(array, baseIsNaN, fromIndex)
}
