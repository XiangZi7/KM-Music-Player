import { cloneArrayBuffer } from './_cloneArrayBuffer'

export function cloneTypedArray(typedArray: any, isDeep: any) {
  const buffer = isDeep
    ? cloneArrayBuffer(typedArray.buffer)
    : typedArray.buffer
  return new typedArray.constructor(
    buffer,
    typedArray.byteOffset,
    typedArray.length
  )
}
