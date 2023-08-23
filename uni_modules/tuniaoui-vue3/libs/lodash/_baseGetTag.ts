const objectProto = Object.prototype
const objectToString = objectProto.toString

export function baseGetTag(value: any) {
  return objectToString.call(value)
}
