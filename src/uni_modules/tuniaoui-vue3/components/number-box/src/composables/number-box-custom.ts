import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties, Ref } from 'vue'
import type { NumberBoxProps } from '../number-box'

type OperationWrapperType = 'minus' | 'input' | 'plus'
type OperationWrapperClass = (type: OperationWrapperType) => string
type OperationWrapperStyle = (type: OperationWrapperType) => CSSProperties

export const useNumberBoxCustomStyle = (
  props: NumberBoxProps,
  inputValue: Ref<number>
) => {
  const ns = useNamespace('number-box')

  // 解析颜色
  const [bgColorClass, bgColorStyle] = useComponentColor(
    toRef(props, 'bgColor'),
    'bg'
  )
  const [textColorClass, textColorStyle] = useComponentColor(
    toRef(props, 'textColor'),
    'text'
  )

  // 步进器对应的类
  const numberBoxClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    // 设置尺寸
    if (props.size) cls.push(ns.m(props.size))

    // 是否禁止操作
    if (props.disabled) cls.push(ns.m('disabled'))

    return cls.join(' ')
  })
  // 步进器对应样式
  const numberBoxStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置容器的宽高
    if (props.width) style.width = formatDomSizeValue(props.width)
    if (props.height) style.height = formatDomSizeValue(props.height)

    // 设置字体大小
    if (props.fontSize) style.fontSize = formatDomSizeValue(props.fontSize)

    return style
  })

  // 步进器操作区域对应的类
  const numberBoxOperationWrapperClass = computed<OperationWrapperClass>(() => {
    return (type: OperationWrapperType) => {
      const cls: string[] = []

      // 设置背景颜色和字体颜色
      if (bgColorClass.value) cls.push(bgColorClass.value)
      if (textColorClass.value) cls.push(textColorClass.value)

      if (
        (type === 'minus' && inputValue.value <= props.min) ||
        (type === 'plus' && inputValue.value >= props.max)
      ) {
        cls.push(ns.is('disabled'))
      }

      return cls.join(' ')
    }
  })
  // 步进器操作区域对应的样式
  const numberBoxOperationWrapperStyle = computed<OperationWrapperStyle>(() => {
    return (type: OperationWrapperType) => {
      const style: CSSProperties = {}

      // 设置背景颜色和字体颜色
      if (!bgColorClass.value)
        style.backgroundColor =
          bgColorStyle.value || 'var(--tn-color-gray-light)'
      if (textColorStyle.value) style.color = textColorStyle.value

      // 设置操作按钮的宽高
      if (type === 'minus' || type === 'plus') {
        if (props.height) {
          style.width = formatDomSizeValue(props.height)
          style.height = style.width
        }
        if (props.fontSize) {
          style.fontSize = `calc(${formatDomSizeValue(props.fontSize)} * 1.2)`
        }
      }

      return style
    }
  })

  return {
    ns,
    numberBoxClass,
    numberBoxStyle,
    numberBoxOperationWrapperClass,
    numberBoxOperationWrapperStyle,
  }
}
