import { cloneArrayBuffer } from './_cloneArrayBuffer'

export function cloneDataView(dataView: any, isDeep: any) {
  const buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer
  return new dataView.constructor(
    buffer,
    dataView.byteOffset,
    dataView.byteLength
  )
}
