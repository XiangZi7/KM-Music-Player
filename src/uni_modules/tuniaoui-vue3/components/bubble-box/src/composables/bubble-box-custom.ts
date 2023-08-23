import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties, Ref } from 'vue'
import type { BubbleBoxProps } from '../bubble-box'
import type { BubbleBoxOptionItemData } from '../types'

type OptionsClassType = (item: BubbleBoxOptionItemData) => string
type OptionsStyleType = (item: BubbleBoxOptionItemData) => CSSProperties

export const useBubbleBoxCustomStyle = (
  props: BubbleBoxProps,
  showBubble: Ref<boolean>
) => {
  const ns = useNamespace('bubble-box')

  // 解析颜色
  const [bgColorClass, bgColorStyle] = useComponentColor(
    toRef(props, 'bgColor'),
    'bg'
  )
  const [borderColorClass, borderColorStyle] = useComponentColor(
    toRef(props, 'bgColor'),
    'border'
  )

  // 选项的类
  const optionsClass = computed<string>(() => {
    const cls: string[] = [
      ns.e('options'),
      ns.em('options', props.position),
      ns.is('show', showBubble.value),
    ]

    if (bgColorClass.value) cls.push(bgColorClass.value)

    return cls.join(' ')
  })
  // 选项的样式
  const optionsStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (!bgColorClass.value)
      style.backgroundColor = bgColorStyle.value || 'var(--tn-color-white)'

    if (props.zIndex) style.zIndex = props.zIndex

    if (props.width) style.width = formatDomSizeValue(props.width)
    if (props.height) style.height = formatDomSizeValue(props.height)

    return style
  })

  // 选项辅助元素的类
  const optionsAuxiliaryElementClass = computed<string>(() => {
    const cls: string[] = ['auxiliary-element']

    if (borderColorClass.value) cls.push(borderColorClass.value)

    return cls.join(' ')
  })
  // 选项辅助元素的样式
  const optionsAuxiliaryElementStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (!borderColorClass.value)
      style.borderColor = borderColorStyle.value || 'var(--tn-color-white)'

    // 根据不同的位置，设置不同的边框样式
    if (props.position === 'top') {
      style.borderRightColor = 'transparent'
      style.borderBottomColor = 'transparent'
      style.borderLeftColor = 'transparent'
    }
    if (props.position === 'right') {
      style.borderTopColor = 'transparent'
      style.borderBottomColor = 'transparent'
      style.borderLeftColor = 'transparent'
    }
    if (props.position === 'bottom') {
      style.borderTopColor = 'transparent'
      style.borderRightColor = 'transparent'
      style.borderLeftColor = 'transparent'
    }
    if (props.position === 'left') {
      style.borderTopColor = 'transparent'
      style.borderRightColor = 'transparent'
      style.borderBottomColor = 'transparent'
    }

    return style
  })

  // 选项item的类
  const optionItemClass = computed<OptionsClassType>(() => {
    return (item: BubbleBoxOptionItemData) => {
      const cls: string[] = [
        ns.e('option-item'),
        ns.is('disabled', item.disabled),
      ]

      if (item.color.class) cls.push(item.color.class)

      return cls.join(' ')
    }
  })
  // 选项item的样式
  const optionItemStyle = computed<OptionsStyleType>(() => {
    return (item: BubbleBoxOptionItemData) => {
      const style: CSSProperties = {}

      if (!item.color.class)
        style.color = item.color.style || 'var(--tn-text-color-primary)'

      if (props.optionItemPadding) style.padding = props.optionItemPadding

      return style
    }
  })

  return {
    ns,
    optionsClass,
    optionsStyle,
    optionsAuxiliaryElementClass,
    optionsAuxiliaryElementStyle,
    optionItemClass,
    optionItemStyle,
  }
}
