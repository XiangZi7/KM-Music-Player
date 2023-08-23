/* eslint-disable eslint-comments/no-unlimited-disable */
import { warn } from 'vue'
import { fromPairs } from '../../../libs/lodash'
import { isObject } from '../../types'
import { hasOwn } from '../../objects'

import type { PropType } from 'vue'
import type {
  IfNativePropType,
  IfTnProp,
  NativePropType,
  TnProp,
  TnPropConvert,
  TnPropFinalized,
  TnPropInput,
  TnPropMergeType,
} from './types'

export const tnPropKey = '__tnPropKey'

export const definePropType = <T>(val: any): PropType<T> => val

export const isTnProp = (val: unknown): val is TnProp<any, any, any> =>
  isObject(val) && !!(val as any)[tnPropKey]

/**
  * 生成 prop，能更好地优化类型
  * @example
  // limited options
  // the type will be PropType<'light' | 'dark'>
  buildProp({
    type: String,
    values: ['light', 'dark'],
  } as const)
  * @example
  // limited options and other types
  // the type will be PropType<'small' | 'large' | number>
  buildProp({
    type: [String, Number],
    values: ['small', 'large'],
    validator: (val: unknown): val is number => typeof val === 'number',
  } as const)
*/
// eslint-disable-next-line eslint-comments/no-duplicate-disable
// eslint-disable-next-line eslint-comments/no-unlimited-disable
/* eslint-disable */
export const buildProp = <
  Type = never,
  Value = never,
  Validator = never,
  Default extends TnPropMergeType<Type, Value, Validator> = never,
  Required extends boolean = false
>(
  prop: TnPropInput<Type, Value, Validator, Default, Required>,
  key?: string
): TnPropFinalized<Type, Value, Validator, Default, Required> => {
  if (!isObject(prop) || isTnProp(prop)) return prop as any

  const { values, required, default: defaultValue, type, validator } = prop

  const _validator =
    values || validator
      ? (val: unknown) => {
          let valid = false
          let allowedValues: unknown[] = []

          if (values) {
            allowedValues = Array.from(values)
            if (hasOwn(prop, 'default')) {
              allowedValues.push(defaultValue)
            }
            valid ||= allowedValues.includes(val)
          }
          if (validator) valid ||= validator(val)

          if (!valid && allowedValues.length > 0) {
            const allowValuesText = [...new Set(allowedValues)]
              .map((value) => JSON.stringify(value))
              .join(', ')
            warn(
              `Invalid prop: validation failed${
                key ? ` for prop "${key}"` : ''
              }. Expected one of [${allowValuesText}], got value ${JSON.stringify(
                val
              )}.`
            )
          }
          return valid
        }
      : undefined

  const tnProp: any = {
    type,
    required: !!required,
    validator: _validator,
    [tnPropKey]: true,
  }
  if (hasOwn(prop, 'default')) tnProp.default = defaultValue
  return tnProp
}

export const buildProps = <
  Props extends Record<
    string,
    | { [tnPropKey]: true }
    | NativePropType
    | TnPropInput<any, any, any, any, any>
  >
>(
  props: Props
): {
  [K in keyof Props]: IfTnProp<
    Props[K],
    Props[K],
    IfNativePropType<Props[K], Props[K], TnPropConvert<Props[K]>>
  >
} =>
  fromPairs(
    Object.entries(props).map(([key, option]) => [
      key,
      buildProp(option as any, key),
    ])
  ) as any
/* eslint-enable */
