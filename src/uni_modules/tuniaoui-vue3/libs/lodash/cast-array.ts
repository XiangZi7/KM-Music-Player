import type { Many } from './_common'

export function castArray<T>(value: Many<T>): T[] {
  if (!value || (Array.isArray(value) && !value.length)) {
    return []
  }
  return Array.isArray(value) ? value : [value as T]
}
