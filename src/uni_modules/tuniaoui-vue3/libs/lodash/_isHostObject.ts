export function isHostObject(value: any) {
  let result = false
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!`${value}`
    } catch (e) {}
  }
  return result
}
