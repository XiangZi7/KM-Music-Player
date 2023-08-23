import { isSymbol } from '@vue/shared'
import { INFINITY } from './_common'

import type { PropertyName } from './_common'

const symbolProto = Symbol ? Symbol.prototype : undefined
const symbolToString = symbolProto ? symbolProto.toString : undefined

export function baseToString(value: PropertyName) {
  if (typeof value == 'string') {
    return value
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : ''
  }
  const result = `${value}`
  return result == '0' && 1 / value == -INFINITY ? '-0' : result
}
