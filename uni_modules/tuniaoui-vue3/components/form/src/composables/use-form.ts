import { computed } from 'vue'
import { filterFields } from '../utils'
import { isFunction } from '../../../../utils'

import type { ValidateFieldsError } from '../../../../libs/async-validator'
import type { FormItemProp } from '../form-item'
import type { FormProps } from '../form'
import type {
  FormContext,
  FormItemContext,
  FormValidationCallback,
  FormValidationResult,
} from '../types'
import type { Arrayable } from '../../../../utils'

export const useForm = (props: FormProps) => {
  // formItem信息
  const fields: FormItemContext[] = []

  // 添加formItem信息
  const addField: FormContext['addField'] = (field) => {
    fields.push(field)
  }

  // 移除formItem信息
  const removeField: FormContext['removeField'] = (field) => {
    if (field.prop) {
      fields.splice(fields.indexOf(field), 1)
    }
  }

  // 重置formItem
  const resetFields: FormContext['resetFields'] = (properties = []) => {
    if (!props.model) {
      // eslint-disable-next-line no-console
      return console.warn('[TnForm] model参数未定义')
    }
    filterFields(fields, properties).forEach((field) => field.resetField())
  }

  // 清除formItem验证
  const clearValidate: FormContext['clearValidate'] = (props = []) => {
    filterFields(fields, props).forEach((field) => field.clearValidate())
  }

  // 是否可以进行校验
  const isValidatable = computed(() => {
    const hasModel = !!props.model
    if (!hasModel) {
      // eslint-disable-next-line no-console
      console.warn('[TnForm] model参数未定义')
    }
    return hasModel
  })

  // 获取需要校验的字段
  const obtainValidateFields = (props: Arrayable<FormItemProp>) => {
    if (fields.length === 0) return []

    const filteredFields = filterFields(fields, props)
    if (!filteredFields.length) {
      // eslint-disable-next-line no-console
      console.warn('[TnForm] 未找到需要校验的字段')
      return []
    }
    return filteredFields
  }

  // 校验
  const validate = async (
    callback?: FormValidationCallback
  ): FormValidationResult => validateField(undefined, callback)

  // 开始校验字段
  const doValidateField = async (
    props: Arrayable<FormItemProp>
  ): Promise<boolean> => {
    if (!isValidatable.value) return false

    const fields = obtainValidateFields(props)
    if (fields.length === 0) return false

    let validationErrors: ValidateFieldsError = {}
    for (const field of fields) {
      try {
        await field.validate('')
      } catch (fields) {
        validationErrors = {
          ...validationErrors,
          ...(fields as ValidateFieldsError),
        }
      }
    }

    if (Object.keys(validationErrors).length === 0) return true
    return Promise.reject(validationErrors)
  }

  // 校验字段
  const validateField: FormContext['validateField'] = async (
    modelProps = [],
    callback
  ) => {
    const shouldThrow = !isFunction(callback)
    try {
      const result = await doValidateField(modelProps)
      // 如果结果为false则说明当前校验不通过
      if (result === true) {
        callback?.(true)
      }
      return result
    } catch (e) {
      if (e instanceof Error) throw e

      const invalidFields = e as ValidateFieldsError

      callback?.(false, invalidFields)
      return shouldThrow && Promise.reject(invalidFields)
    }
  }

  return {
    addField,
    removeField,
    resetFields,
    clearValidate,
    validate,
    validateField,
  }
}
