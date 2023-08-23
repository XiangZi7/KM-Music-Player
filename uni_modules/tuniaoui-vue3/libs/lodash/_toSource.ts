const funcProto = Function.prototype
const funcToString = funcProto.toString

export function toSource(func: any) {
  if (func != null) {
    try {
      return funcToString.call(func)
    } catch (e) {}
    try {
      return `${func}`
    } catch (e) {}
  }
  return ''
}
