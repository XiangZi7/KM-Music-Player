export const cloneDeep = <T>(value: T, visited = new WeakMap()): T => {
  if (value === null || typeof value !== 'object') {
    return value
  }

  if (visited.has(value)) {
    return visited.get(value)
  }

  if (Array.isArray(value)) {
    const clonedArray = value.map((item) => cloneDeep(item, visited)) as any
    visited.set(value, clonedArray)
    return clonedArray
  }

  if (value instanceof Date) {
    return new Date(value.getTime()) as any
  }

  if (value instanceof RegExp) {
    const flags = value.flags
    return new RegExp(value.source, flags) as any
  }

  const clonedObject = {} as T
  visited.set(value, clonedObject)
  for (const key in value) {
    if (Object.prototype.hasOwnProperty.call(value, key)) {
      clonedObject[key] = cloneDeep(value[key], visited)
    }
  }
  const prototype = Object.getPrototypeOf(value)
  Object.setPrototypeOf(clonedObject, cloneDeep(prototype, visited))
  return clonedObject
}
