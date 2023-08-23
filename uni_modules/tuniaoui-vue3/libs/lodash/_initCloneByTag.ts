import { cloneArrayBuffer } from './_cloneArrayBuffer'
import { cloneDataView } from './_cloneDataView'
import { cloneMap } from './_cloneMap'
import { cloneRegExp } from './_cloneRegExp'
import { cloneSet } from './_cloneSet'
import { cloneSymbol } from './_cloneSymbol'
import { cloneTypedArray } from './_cloneTypedArray'

const boolTag = '[object Boolean]',
  dateTag = '[object Date]',
  mapTag = '[object Map]',
  numberTag = '[object Number]',
  regexpTag = '[object RegExp]',
  setTag = '[object Set]',
  stringTag = '[object String]',
  symbolTag = '[object Symbol]'

const arrayBufferTag = '[object ArrayBuffer]',
  dataViewTag = '[object DataView]',
  float32Tag = '[object Float32Array]',
  float64Tag = '[object Float64Array]',
  int8Tag = '[object Int8Array]',
  int16Tag = '[object Int16Array]',
  int32Tag = '[object Int32Array]',
  uint8Tag = '[object Uint8Array]',
  uint8ClampedTag = '[object Uint8ClampedArray]',
  uint16Tag = '[object Uint16Array]',
  uint32Tag = '[object Uint32Array]'

export function initCloneByTag(
  object: any,
  tag: any,
  cloneFunc: any,
  isDeep: any
) {
  const Ctor = object.constructor
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object)

    case boolTag:
    case dateTag:
      return new Ctor(+object)

    case dataViewTag:
      return cloneDataView(object, isDeep)

    case float32Tag:
    case float64Tag:
    case int8Tag:
    case int16Tag:
    case int32Tag:
    case uint8Tag:
    case uint8ClampedTag:
    case uint16Tag:
    case uint32Tag:
      return cloneTypedArray(object, isDeep)

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc)

    case numberTag:
    case stringTag:
      return new Ctor(object)

    case regexpTag:
      return cloneRegExp(object)

    case setTag:
      return cloneSet(object, isDeep, cloneFunc)

    case symbolTag:
      return cloneSymbol(object)
  }
}
