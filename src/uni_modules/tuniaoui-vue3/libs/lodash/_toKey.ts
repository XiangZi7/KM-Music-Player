import { isSymbol } from '@vue/shared'
import { INFINITY } from './_common'

export function toKey(value: any) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value
  }
  const result = `${value}`
  return result == '0' && 1 / value == -INFINITY ? '-0' : result
}
