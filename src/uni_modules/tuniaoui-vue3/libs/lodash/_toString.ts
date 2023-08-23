import { baseToString } from './_baseToString'

import type { PropertyName } from './_common'

export function toString(value: PropertyName) {
  return value == null ? '' : baseToString(value)
}
