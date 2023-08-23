export function cloneArrayBuffer(arrayBuffer: any) {
  const result = new arrayBuffer.constructor(arrayBuffer.byteLength)
  new Uint8Array(result).set(new Uint8Array(arrayBuffer))
  return result
}
