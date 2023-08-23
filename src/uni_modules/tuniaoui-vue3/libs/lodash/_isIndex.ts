import { MAX_SAFE_INTEGER, reIsUint } from './_common'

export function isIndex(value: any, length?: any) {
  length = length == null ? MAX_SAFE_INTEGER : length
  return (
    !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    value > -1 &&
    value % 1 == 0 &&
    value < length
  )
}
