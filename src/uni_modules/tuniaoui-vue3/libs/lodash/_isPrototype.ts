const objectProto = Object.prototype

export function isPrototype(value: any) {
  const Ctor = value && value.constructor,
    proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto

  return value === proto
}
