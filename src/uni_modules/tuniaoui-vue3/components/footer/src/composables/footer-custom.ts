import { computed, toRef } from 'vue'
import {
  useComponentColor,
  useComponentSize,
  useNamespace,
} from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { FooterProps } from '../footer'
import type { FooterNavigatorItem } from '../types'

type FooterNavigatorClassType = (item: FooterNavigatorItem) => string
type FooterNavigatorStyleType = (item: FooterNavigatorItem) => CSSProperties

export const useFooterCustomStyle = (props: FooterProps) => {
  const ns = useNamespace('footer')

  // 解析颜色
  const [textColorClass, textColorStyle] = useComponentColor(
    toRef(props, 'textColor'),
    'text'
  )
  // 解析尺寸
  const { sizeType } = useComponentSize(props.size)

  // 页脚的类
  const footerClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    // 设置尺寸
    if (props.size && sizeType.value === 'inner') cls.push(ns.m(props.size))

    // 是否固定在底部
    if (props.fixed) {
      cls.push(ns.e('fixed'), ns.em('fixed', props.fixedMode))
      if (props.safeAreaInsetBottom) {
        cls.push('tn-u-safe-area')
      }
    }

    return cls.join(' ')
  })
  // 页脚的样式
  const footerStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (props.offsetBottom)
      style.bottom = formatDomSizeValue(props.offsetBottom)

    if (props.size && sizeType.value === 'custom') {
      style.fontSize = formatDomSizeValue(props.size)
    }

    return style
  })

  // 页脚内容的类
  const contentClass = computed<string>(() => {
    const cls: string[] = [ns.e('content')]

    // 设置颜色
    if (textColorClass.value) cls.push(textColorClass.value)

    return cls.join(' ')
  })
  // 页脚内容的样式
  const contentStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置颜色
    if (!textColorClass.value)
      style.color = textColorStyle.value || 'var(--tn-text-color-secondary)'

    return style
  })

  // 页脚导航的类
  const navigatorClass = computed<FooterNavigatorClassType>(() => {
    return (item: FooterNavigatorItem) => {
      const cls: string[] = [ns.e('navigator')]

      if (item.color.class) cls.push(item.color.class)

      return cls.join(' ')
    }
  })
  // 页脚导航的样式
  const navigatorStyle = computed<FooterNavigatorStyleType>(() => {
    return (item: FooterNavigatorItem) => {
      const style: CSSProperties = {}

      // 设置颜色
      if (!item.color.class)
        style.color = item.color.style || 'var(--tn-color-primary)'

      return style
    }
  })

  return {
    ns,
    footerClass,
    footerStyle,
    contentClass,
    contentStyle,
    navigatorClass,
    navigatorStyle,
  }
}
