import { computed, toRef } from 'vue'
import {
  useComponentColor,
  useComponentSize,
  useNamespace,
} from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { TitleProps } from '../title'

export const useTitleCustomStyle = (props: TitleProps) => {
  const ns = useNamespace('title')

  // 解析颜色
  const [titleTextColorClass, titleTextColorStyle] = useComponentColor(
    toRef(props, 'color'),
    'text'
  )
  const [titleBgColorClass, titleBgColorStyle] = useComponentColor(
    toRef(props, 'color'),
    'bg'
  )
  const [assistTextColorClass, assistTextColorStyle] = useComponentColor(
    toRef(props, 'assistColor'),
    'text'
  )
  const [assistBgColorClass, assistBgColorStyle] = useComponentColor(
    toRef(props, 'assistColor'),
    'bg'
  )

  // 解析尺寸
  const { sizeType } = useComponentSize(props.size)

  // title对应的类
  const titleClass = computed<string>(() => {
    const cls: string[] = [ns.e('title'), ns.em('title', props.mode)]

    // 设置颜色
    if (props.mode === 'transparent') {
      cls.push('tn-text-transparent')
      if (titleBgColorClass.value) cls.push(titleBgColorClass.value)
    } else {
      if (titleTextColorClass.value) cls.push(titleTextColorClass.value)
    }

    // 设置尺寸
    if (props.size && sizeType.value === 'inner')
      cls.push(ns.em('title', props.size))

    return cls.join(' ')
  })
  // title对应的样式
  const titleStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置颜色
    if (props.mode === 'transparent') {
      if (!titleBgColorClass.value)
        style.backgroundColor =
          titleBgColorStyle.value || 'var(--tn-color-primary)'
    } else {
      if (!titleTextColorClass.value)
        style.color =
          titleTextColorStyle.value || 'var(--tn-text-color-primary)'
    }

    // 设置尺寸
    if (props.size && sizeType.value === 'custom')
      style.fontSize = formatDomSizeValue(props.size)

    // 设置对齐方式
    if (props.align) style.textAlign = props.align

    return style
  })

  // assist颜色对应的类
  const assistColorClass = computed<string>(() => {
    const cls: string[] = []

    if (props.mode === 'subTitle') {
      if (assistTextColorClass.value) cls.push(assistTextColorClass.value)
    } else {
      if (assistBgColorClass.value) cls.push(assistBgColorClass.value)
    }

    return cls.join(' ')
  })
  // assist颜色对应的样式
  const assistColorStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (props.mode === 'subTitle') {
      if (!assistTextColorClass.value)
        style.color =
          assistTextColorStyle.value || 'var(--tn-color-primary-light-7)'
    } else {
      if (!assistBgColorClass.value)
        style.backgroundColor =
          assistBgColorStyle.value || 'var(--tn-color-primary)'
    }

    return style
  })

  return {
    ns,
    titleClass,
    titleStyle,
    assistColorClass,
    assistColorStyle,
  }
}
