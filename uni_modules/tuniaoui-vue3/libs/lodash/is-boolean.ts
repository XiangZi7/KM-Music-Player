import { isObjectLike } from './is-object-like'
import { objectToString } from './_objectToString'

const boolTag = '[object Boolean]'

export function isBoolean(value?: any): value is boolean {
  return (
    value === true ||
    value === false ||
    (isObjectLike(value) && objectToString.call(value) == boolTag)
  )
}
