import { computed, toRef } from 'vue'
import {
  useComponentColor,
  useComponentSize,
  useNamespace,
} from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { CountDownProps } from '../count-down'

export const useCountDownCustomStyle = (props: CountDownProps) => {
  const ns = useNamespace('count-down')

  // 解析颜色
  const [textColorClass, textColorStyle] = useComponentColor(
    toRef(props, 'textColor'),
    'text'
  )
  const [separatorColorClass, separatorColorStyle] = useComponentColor(
    toRef(props, 'separatorColor'),
    'text'
  )
  const [borderColorClass, borderColorStyle] = useComponentColor(
    toRef(props, 'borderColor'),
    'border'
  )

  const { sizeType } = useComponentSize(props.size)

  // 倒计时的类
  const countDownClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    if (props.size && sizeType.value === 'inner') cls.push(ns.m(props.size))

    return cls.join(' ')
  })
  // 倒计时的样式
  const countDownStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置字体大小
    if (props.size && sizeType.value === 'custom')
      style.fontSize = formatDomSizeValue(props.size)

    return style
  })

  // 倒计时文字的类
  const textClass = computed<string>(() => {
    const cls: string[] = [ns.e('text')]

    // 设置字体颜色
    if (textColorClass.value) cls.push(textColorClass.value)

    // 设置边框颜色
    if (props.border) {
      cls.push(ns.is('border'))
      if (borderColorClass.value) cls.push(borderColorClass.value)
    }

    return cls.join(' ')
  })
  // 倒计时文字的样式
  const textStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置字体颜色
    if (!textColorClass.value)
      style.color = textColorStyle.value || 'var(--tn-text-color-primary)'

    // 设置边框颜色
    if (props.border) {
      if (!borderColorClass.value)
        style.borderColor =
          borderColorStyle.value || 'var(--tn-color-gray-disabled)'
    }

    return style
  })

  // 分割符的类
  const separatorClass = computed<string>(() => {
    const cls: string[] = [
      ns.e('separator'),
      ns.em('separator', props.separatorMode),
    ]

    if (separatorColorClass.value) cls.push(separatorColorClass.value)

    return cls.join(' ')
  })
  // 分割符的样式
  const separatorStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (!separatorColorClass.value)
      style.color =
        separatorColorStyle.value || 'var(--tn-text-color-secondary)'

    return style
  })

  return {
    ns,
    countDownClass,
    countDownStyle,
    textClass,
    textStyle,
    separatorClass,
    separatorStyle,
  }
}
