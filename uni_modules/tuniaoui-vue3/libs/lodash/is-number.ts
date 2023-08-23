import { isObjectLike } from './is-object-like'
import { objectToString } from './_objectToString'

const numberTag = '[object Number]'

export function isNumber(value?: any): value is number {
  return (
    typeof value == 'number' ||
    (isObjectLike(value) && objectToString.call(value) == numberTag)
  )
}
