/* eslint-disable indent */
import { baseIsArguments } from './_baseIsArguments'
import { isObjectLike } from './is-object-like'

const objectProto = Object.prototype

const hasOwnProperty = objectProto.hasOwnProperty

const propertyIsEnumerable = objectProto.propertyIsEnumerable

const isArguments = baseIsArguments(
  (function () {
    // eslint-disable-next-line prefer-rest-params
    return arguments
  })()
)
  ? baseIsArguments
  : function (value: any) {
      return (
        isObjectLike(value) &&
        hasOwnProperty.call(value, 'callee') &&
        !propertyIsEnumerable.call(value, 'callee')
      )
    }

export { isArguments }
