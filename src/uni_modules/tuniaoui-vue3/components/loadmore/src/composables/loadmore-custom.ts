import { computed, toRef } from 'vue'
import {
  useComponentColor,
  useComponentSize,
  useNamespace,
} from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { LoadmoreProps } from '../loadmore'

export const useLoadmoreCustomStyle = (props: LoadmoreProps) => {
  const ns = useNamespace('loadmore')

  // 解析颜色
  const [textColorClass, textColorStyle] = useComponentColor(
    toRef(props, 'color'),
    'text'
  )
  const [bgColorClass, bgColorStyle] = useComponentColor(
    toRef(props, 'color'),
    'bg'
  )

  // 解析尺寸
  const { sizeType } = useComponentSize(props.size)

  // loadmore对应的类
  const loadmoreClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    // 设置当前加载的模式
    cls.push(ns.is(props.status))

    // 是否有设置加载图标
    if (props.loadingIcon) cls.push(ns.is('loading-icon'))

    // 设置颜色
    if (textColorClass.value) cls.push(textColorClass.value)

    // 设置尺寸
    if (props.size && sizeType.value === 'inner') cls.push(ns.m(props.size))

    return cls.join(' ')
  })
  // loadmore样式
  const loadmoreStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置颜色
    if (!textColorClass.value) {
      style.color = textColorStyle.value || 'var(--tn-text-color-primary)'
    }

    // 设置尺寸
    if (props.size && sizeType.value === 'custom') {
      style.fontSize = formatDomSizeValue(props.size)
    }

    return style
  })

  // dot点内容对应的类
  const dotClass = computed<string>(() => {
    const cls: string[] = [ns.e('dot')]

    // 设置背景颜色
    if (bgColorClass.value) cls.push(bgColorClass.value)

    return cls.join(' ')
  })
  // dot点内容的样式
  const dotStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置背景颜色
    if (!bgColorClass.value) {
      style.backgroundColor =
        bgColorStyle.value || 'var(--tn-text-color-primary)'
    }

    // 设置尺寸
    if (props.size && sizeType.value === 'custom') {
      style.width = style.height = formatDomSizeValue(props.size)
    }

    return style
  })

  return {
    ns,
    loadmoreClass,
    loadmoreStyle,
    dotClass,
    dotStyle,
  }
}
