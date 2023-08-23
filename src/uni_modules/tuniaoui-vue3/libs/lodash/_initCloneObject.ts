import { isPrototype } from './_isPrototype'
import { isObject } from './is-object'

function overArg(func: any, transform: any) {
  return function (arg: any) {
    return func(transform(arg))
  }
}

const getPrototype = overArg(Object.getPrototypeOf, Object)

function baseCreate(proto: any) {
  return isObject(proto) ? objectCreate(proto) : {}
}

const objectCreate = Object.create

export function initCloneObject(object: any) {
  return typeof object.constructor == 'function' && !isPrototype(object)
    ? baseCreate(getPrototype(object))
    : {}
}
