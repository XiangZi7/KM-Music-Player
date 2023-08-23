import { assignValue } from './_assignValue'

export function copyObject(
  source: any,
  props: any,
  object: any,
  customizer?: any
) {
  object || (object = {})

  let index = -1
  const length = props.length

  while (++index < length) {
    const key = props[index]

    let newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined

    if (newValue === undefined) {
      newValue = source[key]
    }
    assignValue(object, key, newValue)
  }
  return object
}
