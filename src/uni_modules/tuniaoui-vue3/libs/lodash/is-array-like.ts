import { isFunction } from './is-function'
import { isLength } from './is-length'

export function isArrayLike(value: any) {
  return value != null && isLength(value.length) && !isFunction(value)
}
