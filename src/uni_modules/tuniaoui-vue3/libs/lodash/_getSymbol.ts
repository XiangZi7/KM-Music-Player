/* eslint-disable prefer-arrow-callback */
/* eslint-disable indent */
import { arrayFilter } from './_arrayFilter'
import { stubArray } from './stubArray'

const objectProto = Object.prototype

const propertyIsEnumerable = objectProto.propertyIsEnumerable

const nativeGetSymbols = Object.getOwnPropertySymbols

const getSymbols = !nativeGetSymbols
  ? stubArray
  : function (object: any) {
      if (object == null) return []
      object = new Object(object)
      return arrayFilter(nativeGetSymbols(object), function (symbol: any) {
        return propertyIsEnumerable.call(object, symbol)
      })
    }

export { getSymbols }
