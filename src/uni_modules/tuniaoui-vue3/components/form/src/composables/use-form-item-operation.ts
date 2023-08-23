import { computed, inject, nextTick, ref, watch } from 'vue'
import AsyncValidator from '../../../../libs/async-validator'
import { castArray, debounce } from '../../../../libs/lodash'
import { formContextKey } from '../../../../tokens'
import {
  cloneDeep,
  getProp,
  isEmptyVariableInDefault,
  isFunction,
  isString,
} from '../../../../utils'

import type { Slots } from 'vue'
import type { RuleItem } from '../../../../libs/async-validator'
import type { FormItemProps, FormItemValidateStates } from '../form-item'
import type {
  FormItemContext,
  FormItemRule,
  FormValidateFailure,
} from '../types'
import type { Arrayable } from '../../../../utils'

export const useFormItemOperation = (props: FormItemProps, slots: Slots) => {
  const formContext = inject(formContextKey, undefined)

  // 初始化的值
  let initialValue: any = undefined
  // 是否重置字段校验
  let isResettingField = false

  // 校验状态
  const validateState = ref<FormItemValidateStates>('')
  const validateStateDebounced = ref<FormItemValidateStates>('')

  // 错误信息
  const validateMessage = ref('')

  // 是否有标签
  const hasLabel = computed(() => {
    return !!(props.label || slots.label)
  })

  // 当前标签的值
  const currentLabel = computed(
    () => `${props.label || ''}${formContext?.labelSuffix || ''}`
  )

  // formItem field字段名称
  const fieldValue = computed(() => {
    const model = formContext?.model
    if (!model || !props.prop) {
      return
    }
    return getProp(model, props.prop).value
  })

  // formItem prop字段名称
  const propString = computed(() => {
    if (!props.prop) return ''
    return isString(props.prop) ? props.prop : props.prop.join('.')
  })

  // 校验规则
  const normalizedRules = computed(() => {
    const rules: FormItemRule[] = []
    // 如果设置了rules，则直接使用rules
    if (props.rules) rules.push(...castArray(props.rules))

    // 如果设置了prop，则根据prop从formContext中获取rules
    const formRules = formContext?.rules
    if (formRules && props.prop) {
      const _rules = getProp<Arrayable<FormItemRule> | undefined>(
        formRules,
        props.prop
      ).value
      if (_rules) rules.push(...castArray(_rules))
    }

    // 如果设置了required，则根据required的值来设置校验规则
    if (props.required !== undefined) {
      const requiredRules = rules
        .map((rule, index) => [rule, index] as const)
        .filter(([rule]) => Object.keys(rule).includes('required'))
      if (requiredRules.length) {
        for (const [rule, index] of requiredRules) {
          if (rule.required === props.required) continue
          rules[index] = { ...rule, required: props.required }
        }
      } else {
        rules.push({ required: props.required })
      }
    }

    return rules
  })

  // 是否需要校验（开启校验）
  const validateEnabled = computed(() => normalizedRules.value.length > 0)

  // 是否为必填
  const isRequired = computed(() =>
    normalizedRules.value.some((rule) => rule.required)
  )

  // 是否显示错误信息
  const shouldShowError = computed(
    () =>
      validateStateDebounced.value === 'error' &&
      props.showMessage &&
      isEmptyVariableInDefault(formContext?.showMessage, true)
  )

  // 设置校验状态
  const setValidateState = (state: FormItemValidateStates) => {
    validateState.value = state
  }

  // 获取校验规则
  const getFilterRule = (trigger: string) => {
    const rules = normalizedRules.value
    return (
      rules
        .filter((rule) => {
          if (!rule.trigger || !trigger) return true
          if (Array.isArray(rule.trigger)) {
            return rule.trigger.includes(trigger)
          } else {
            return rule.trigger === trigger
          }
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map(({ trigger, ...rule }): RuleItem => rule)
    )
  }

  // 校验失败
  const onValidationFailed = (error: FormValidateFailure) => {
    const { errors, fields } = error
    if (!errors || !fields) {
      console.error(error)
    }

    setValidateState('error')
    validateMessage.value = errors
      ? isEmptyVariableInDefault(errors?.[0]?.message, `${props.prop} 为必填项`)
      : ''

    formContext?.emits('validate', props.prop!, false, validateMessage.value)
  }

  // 校验通过
  const onValidationSucceded = () => {
    setValidateState('success')
    validateMessage.value = ''

    formContext?.emits('validate', props.prop!, true, '')
  }

  // 进行校验操作
  const doValidate = async (rules: RuleItem[]): Promise<true> => {
    const modelName = propString.value
    const validator = new AsyncValidator({
      [modelName]: rules,
    })
    return validator
      .validate({ [modelName]: fieldValue.value }, { firstFields: true })
      .then(() => {
        onValidationSucceded()
        return true as const
      })
      .catch((err: FormValidateFailure) => {
        onValidationFailed(err as FormValidateFailure)
        return Promise.reject(err)
      })
  }

  // 校验
  const validate: FormItemContext['validate'] = async (trigger, callback) => {
    // 重置字段后跳过校验
    if (isResettingField || !props.prop) return false

    const hasCallback = isFunction(callback)
    if (!validateEnabled.value) {
      callback?.(false)
      return false
    }

    const rules = getFilterRule(trigger)
    if (rules.length === 0) {
      callback?.(true)
      return true
    }

    setValidateState('validating')

    return doValidate(rules)
      .then(() => {
        callback?.(true)
        return true as const
      })
      .catch((err: FormValidateFailure) => {
        const { fields } = err
        callback?.(false, fields)
        return hasCallback ? false : Promise.reject(fields)
      })
  }

  // 清除校验信息
  const clearValidate: FormItemContext['clearValidate'] = () => {
    setValidateState('')
    validateMessage.value = ''
    isResettingField = false
  }

  // 重置字段
  const resetField: FormItemContext['resetField'] = async () => {
    const model = formContext?.model
    if (!model || !props.prop) return

    const computedValue = getProp(model, props.prop)

    // 阻止触发校验
    isResettingField = true

    computedValue.value = cloneDeep(initialValue)

    await nextTick()
    clearValidate()

    isResettingField = false
  }

  // 设置初始化的值
  const initFieldValue = () => {
    initialValue = cloneDeep(fieldValue.value)
  }

  const validateStateDebouncedUpdater = debounce(() => {
    validateStateDebounced.value = validateState.value
  }, 100)
  watch(
    () => validateState.value,
    () => validateStateDebouncedUpdater()
  )

  watch(
    () => props.error,
    (val) => {
      validateMessage.value = val || ''
      setValidateState(val ? 'error' : '')
    },
    {
      immediate: true,
    }
  )

  watch(
    () => props.validateStatus,
    (val) => {
      setValidateState(val || '')
    }
  )

  return {
    formContext,
    hasLabel,
    currentLabel,
    validateState,
    validateMessage,
    isRequired,
    shouldShowError,
    doValidate,
    validate,
    clearValidate,
    resetField,
    initFieldValue,
  }
}
