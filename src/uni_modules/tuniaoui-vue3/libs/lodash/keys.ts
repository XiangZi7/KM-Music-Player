import { arrayLikeKeys } from './_arrayLikeKeys'
import { baseKeys } from './_baseKeys'
import { isArrayLike } from './is-array-like'

export function keys(object: any) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object)
}
