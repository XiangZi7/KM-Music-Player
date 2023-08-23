import { computed, toRef, watch } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'

import type { CSSProperties, Ref } from 'vue'
import type { ModalBtnStyle } from '../modal'

type OperationBtnComputedClass = (type: 'cancel' | 'confirm') => string
type OperationBtnComputedStyle = (type: 'cancel' | 'confirm') => CSSProperties

export const useModalCustomStyle = (
  cancelBtnStyle: Ref<ModalBtnStyle>,
  confirmBtnStyle: Ref<ModalBtnStyle>
) => {
  const ns = useNamespace('modal')

  // 解析按钮的颜色
  const [cancelBtnBgClass, cancelBtnBgStyle, updateCancelBtnBg] =
    useComponentColor(toRef(cancelBtnStyle.value, 'bgColor'), 'bg')
  const [cancelBtnColorClass, cancelBtnColorStyle, updateCancelBtnColor] =
    useComponentColor(toRef(cancelBtnStyle.value, 'color'), 'text')
  const [confirmBtnBgClass, confirmBtnBgStyle, updateConfirmBtnBg] =
    useComponentColor(toRef(confirmBtnStyle.value, 'bgColor'), 'bg')
  const [confirmBtnColorClass, confirmBtnColorStyle, updateConfirmBtnColor] =
    useComponentColor(toRef(confirmBtnStyle.value, 'color'), 'text')

  watch(
    () => confirmBtnStyle,
    (value) => {
      updateConfirmBtnBg(value.value.bgColor)
      updateConfirmBtnColor(value.value.color)
    },
    {
      deep: true,
    }
  )
  watch(
    () => cancelBtnStyle,
    (value) => {
      updateCancelBtnBg(value.value.bgColor)
      updateCancelBtnColor(value.value.color)
    },
    {
      deep: true,
    }
  )

  // 操作按钮所属类
  const operationBtnClass = computed<OperationBtnComputedClass>(() => {
    return (type: 'cancel' | 'confirm') => {
      const cls: string[] = [
        ns.e('operation-btn'),
        ns.em('operation-btn', type),
      ]

      if (type === 'cancel') {
        if (cancelBtnBgClass.value) cls.push(cancelBtnBgClass.value)
        if (cancelBtnColorClass.value) cls.push(cancelBtnColorClass.value)
      }
      if (type === 'confirm') {
        if (confirmBtnBgClass.value) cls.push(confirmBtnBgClass.value)
        if (confirmBtnColorClass.value) cls.push(confirmBtnColorClass.value)
      }

      return cls.join(' ')
    }
  })

  // 操作按钮的样式
  const operationBtnStyle = computed<OperationBtnComputedStyle>(() => {
    return (type: 'cancel' | 'confirm') => {
      const style: CSSProperties = {}

      if (type === 'cancel') {
        if (cancelBtnBgStyle.value)
          style.backgroundColor = cancelBtnBgStyle.value
        if (cancelBtnColorStyle.value) {
          style.color = cancelBtnColorStyle.value
        } else if (!cancelBtnBgClass.value && !cancelBtnColorClass.value) {
          style.color = 'var(--tn-color-danger)'
        }
      }
      if (type === 'confirm') {
        if (confirmBtnBgStyle.value)
          style.backgroundColor = confirmBtnBgStyle.value
        if (confirmBtnColorStyle.value) {
          style.color = confirmBtnColorStyle.value
        } else if (!confirmBtnBgClass.value && !confirmBtnColorClass.value) {
          style.color = 'var(--tn-color-primary)'
        }
      }

      return style
    }
  })

  return {
    ns,
    operationBtnClass,
    operationBtnStyle,
  }
}
