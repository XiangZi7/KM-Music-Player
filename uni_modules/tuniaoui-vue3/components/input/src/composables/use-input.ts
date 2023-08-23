import { computed, nextTick, ref, watch } from 'vue'
import { trim } from '../../../../libs/lodash'
import {
  CHANGE_EVENT,
  INPUT_EVENT,
  UPDATE_MODEL_EVENT,
} from '../../../../constants'
import {
  FormValidateIconsMap,
  debugWarn,
  isEmptyVariableInDefault,
} from '../../../../utils'
import { useToggle } from '../../../../hooks'
import { useFormDisabled, useFormItem } from '../../../form'

import type { SetupContext } from 'vue'
import type { FormItemValidateStates } from '../../../form'
import type { InputEmit, InputProps } from '../input'

export const useInput = (
  props: InputProps,
  emits: SetupContext<InputEmit>['emit']
) => {
  const { form, formItem } = useFormItem()

  // 输入框内容
  const inputText = ref<string>(String(props.modelValue || ''))
  watch(
    () => props.modelValue,
    (val) => {
      inputText.value = String(val || '')
      if (props.validateEvent) {
        formItem?.validate?.('change').catch((err) => {
          debugWarn(err)
        })
      }
    }
  )

  // 显示/隐藏密码状态
  const [passwordVisible, togglePasswordVisible] = useToggle(false)

  // 是否显示状态图标
  const needStatusIcon = computed(() =>
    isEmptyVariableInDefault(form?.statusIcon, false)
  )
  // 校验状态
  const validateState = computed(() =>
    isEmptyVariableInDefault<FormItemValidateStates>(
      formItem?.validateState,
      ''
    )
  )
  // 校验状态图标
  const validateIcon = computed(
    () => validateState.value && FormValidateIconsMap[validateState.value]
  )

  // 密码显示密码图标
  const passwordIcon = computed(() =>
    passwordVisible.value ? 'eye-hide' : 'eye'
  )

  // 是否显示图标
  const showIcon = computed(() => {
    let status = false
    if (validateState.value && needStatusIcon.value && validateIcon.value)
      status = true
    if (props.showPassword) status = true
    if (props.rightIcon) status = true
    if (props.clearable) status = true
    return status
  })

  // 输入框禁止事件
  const disabled = useFormDisabled(props.disabled)

  // 内容输入触发事件
  const inputInputEvent = (event: any) => {
    const { value } = event.detail
    _updateInputText(value)
  }

  // 输入框聚焦事件
  const inputFocusEvent = (event: any) => {
    emits('focus', event)
  }

  // 输入框失去焦点事件
  const inputBlurEvent = (event: any) => {
    emits('blur', event)
    if (props.validateEvent) {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      formItem?.validate?.('blur').catch((err) => {
        debugWarn(err)
      })
    }
  }

  // 点击完成时触发事件
  const confirmEvent = (event: any) => {
    const { value } = event.detail
    emits('confirm', value)
  }

  // 点击清除按钮
  const clearClickEvent = () => {
    if (disabled.value) return
    _updateInputText('')
    emits('clear')
  }

  // 更新输入框内容
  const _updateInputText = (value: string) => {
    value = props.trim ? trim(value) : value
    // inputText.value = value
    emits(UPDATE_MODEL_EVENT, value)
    nextTick(() => {
      emits(INPUT_EVENT, value)
      emits(CHANGE_EVENT, value)
    })
  }

  // 输入框点击事件
  const inputClickEvent = () => {
    if (props.type === 'select') {
      emits('click')
    }
  }

  return {
    inputText,
    needStatusIcon,
    validateState,
    validateIcon,
    passwordVisible,
    passwordIcon,
    showIcon,
    disabled,
    togglePasswordVisible,
    inputInputEvent,
    inputFocusEvent,
    inputBlurEvent,
    clearClickEvent,
    confirmEvent,
    inputClickEvent,
  }
}
