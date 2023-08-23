import { isSymbol } from '@vue/shared'

import { reIsDeepProp, reIsPlainProp } from './_common'

import type { PropertyPath } from './_common'

export function isKey(value: PropertyPath, object: any) {
  if (Array.isArray(value)) {
    return false
  }
  const type = typeof value
  if (
    type == 'number' ||
    type == 'symbol' ||
    type == 'boolean' ||
    value == null ||
    isSymbol(value)
  ) {
    return true
  }
  return (
    reIsPlainProp.test(value as string) ||
    !reIsDeepProp.test(value as string) ||
    // eslint-disable-next-line unicorn/new-for-builtins
    (object != null && (value as any) in Object(object))
  )
}
