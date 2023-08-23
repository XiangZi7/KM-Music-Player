import { baseGetTag } from './_baseGetTag'
import { isObject } from './is-object'

const asyncTag = '[object AsyncFunction]',
  funcTag = '[object Function]',
  genTag = '[object GeneratorFunction]',
  proxyTag = '[object Proxy]'

export function isFunction(value: any) {
  if (!isObject(value)) {
    return false
  }

  const tag = baseGetTag(value)
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag
}
