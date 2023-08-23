import { baseTimes } from './_baseTime'
import { isIndex } from './_isIndex'
import { isArguments } from './is-arguments'
import { isArray } from './is-array'

const objectProto = Object.prototype
const hasOwnProperty = objectProto.hasOwnProperty

export function arrayLikeKeys(value: any, inherited?: any) {
  const result =
    isArray(value) || isArguments(value) ? baseTimes(value.length, String) : []

  const length = result.length,
    skipIndexes = !!length

  for (const key in value) {
    if (
      (inherited || hasOwnProperty.call(value, key)) &&
      !(skipIndexes && (key == 'length' || isIndex(key, length)))
    ) {
      result.push(key)
    }
  }
  return result
}
