import { baseGetTag } from './_baseGetTag'
import { isObjectLike } from './is-object-like'

const argsTag = '[object Arguments]'

export function baseIsArguments(value: any) {
  return isObjectLike(value) && baseGetTag(value) == argsTag
}
