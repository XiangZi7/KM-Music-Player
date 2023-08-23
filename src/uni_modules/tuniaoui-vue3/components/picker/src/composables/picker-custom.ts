import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'

import type { CSSProperties } from 'vue'
import type { PickerProps } from '../picker'

export type PickerOperationBtnType = 'cancel' | 'confirm'
export type PickerOperationBtnClass = (type: PickerOperationBtnType) => string
export type PickerOperationBtnStyle = (
  type: PickerOperationBtnType
) => CSSProperties

export const usePickerCustomStyle = (props: PickerProps) => {
  const ns = useNamespace('picker')

  // 解析颜色
  const [cancelColorClass, cancelColorStyle] = useComponentColor(
    toRef(props, 'cancelColor'),
    'text'
  )
  const [confirmColorClass, confirmColorStyle] = useComponentColor(
    toRef(props, 'confirmColor'),
    'text'
  )

  // 遮罩的透明度
  const overlayOpacity = computed(() => {
    return props.mask ? 0.5 : 0
  })

  // 取消/确认按钮对应的类
  const operationBtnClass = computed<PickerOperationBtnClass>(() => {
    return (type: PickerOperationBtnType) => {
      const cls: string[] = [
        ns.e('operation-btn'),
        ns.em('operation-btn', type),
      ]

      if (type === 'cancel') {
        if (cancelColorClass.value) cls.push(cancelColorClass.value)
      } else if (type === 'confirm') {
        if (confirmColorClass.value) cls.push(confirmColorClass.value)
      }

      return cls.join(' ')
    }
  })

  // 取消/确认按钮对应的样式
  const operationBtnStyle = computed<PickerOperationBtnStyle>(() => {
    return (type: PickerOperationBtnType) => {
      const style: CSSProperties = {}

      if (type === 'cancel') {
        if (!cancelColorClass.value)
          style.color = cancelColorStyle.value || 'var(--tn-color-danger)'
      } else if (type === 'confirm') {
        if (!confirmColorClass.value)
          style.color = confirmColorStyle.value || 'var(--tn-color-primary)'
      }

      return style
    }
  })

  return {
    ns,
    overlayOpacity,
    operationBtnClass,
    operationBtnStyle,
  }
}
