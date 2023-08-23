import { isPrototype } from './_isPrototype'
import { nativeKeys } from './_nativeKeys'

const objectProto = Object.prototype
const hasOwnProperty = objectProto.hasOwnProperty

export function baseKeys(object: any) {
  if (!isPrototype(object)) {
    return nativeKeys(object)
  }
  const result = []
  for (const key in new Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key)
    }
  }
  return result
}
