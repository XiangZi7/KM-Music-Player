import { isKey } from './_isKey'
import { castPath } from './_castPath'
import { toKey } from './_toKey'

import type { PropertyPath } from './_common'

function baseGet(object: any, path: PropertyPath) {
  path = isKey(path, object) ? [path] : castPath(path)

  let index = 0
  const length = path.length

  while (object != null && index < length) {
    object = object[toKey(path[index++])]
  }
  return index && index == length ? object : undefined
}

export function get(object: any, path: PropertyPath, defaultValue?: any): any {
  const result = object == null ? undefined : baseGet(object, path)
  return result === undefined ? defaultValue : result
}
