import { eq } from './_eq'

const objectProto = Object.prototype
const hasOwnProperty = objectProto.hasOwnProperty

export function assignValue<T extends object>(
  object: T,
  key: string | symbol,
  value: any
) {
  const objValue = object[key as keyof typeof object]
  if (
    !(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
    (value === undefined && !(key in object))
  ) {
    object[key as keyof typeof object] = value
  }
}
