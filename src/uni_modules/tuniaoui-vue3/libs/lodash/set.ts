import { isObject } from '@vue/shared'
import { isKey } from './_isKey'
import { castPath } from './_castPath'
import { toKey } from './_toKey'
import { isIndex } from './_isIndex'
import { assignValue } from './_assignValue'

import type { PropertyPath } from './_common'

function baseSet<T extends object>(
  object: T,
  path: PropertyPath,
  value: any,
  customizer?: any
): T {
  if (!isObject(object)) {
    return object
  }
  path = isKey(path, object) ? [path] : castPath(path)

  let index = -1
  const length = path.length
  const lastIndex = length - 1
  let nested = object

  while (nested != null && ++index < length) {
    const key = toKey(path[index])
    let newValue = value

    if (index != lastIndex) {
      const objValue = nested[key as keyof typeof nested]
      newValue = customizer ? customizer(objValue, key, nested) : undefined
      if (newValue === undefined) {
        newValue = isObject(objValue)
          ? objValue
          : isIndex(path[index + 1])
          ? []
          : {}
      }
    }
    assignValue(nested, key, newValue)
    nested = nested[key as keyof typeof nested]
  }
  return object
}

export function set<T extends object>(
  object: T,
  path: PropertyPath,
  value: any
): T {
  return object == null ? object : baseSet(object, path, value)
}
