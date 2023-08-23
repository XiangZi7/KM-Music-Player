import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'
import { formatDomSizeValue } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { TabbarProps } from '../tabbar'

export const useTabbarCustomStyle = (props: TabbarProps) => {
  const ns = useNamespace('tabbar')

  // 解析颜色
  const [bgColorClass, bgColorStyle] = useComponentColor(
    toRef(props, 'bgColor'),
    'bg'
  )

  // tabbar对应的类
  const tabbarClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    // 是否固定在底部
    if (props.fixed) cls.push(ns.m('fixed'))

    // 是否预留安全距离
    if (props.safeAreaInsetBottom) cls.push('tn-u-safe-area')

    // 是否有顶部阴影
    if (props.topShadow) cls.push(ns.m('top-shadow'))

    return cls.join(' ')
  })
  // tabbar对应的样式
  const tabbarStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置zIndex
    if (props.zIndex) style.zIndex = props.zIndex

    // 设置高度
    if (props.height) style.height = formatDomSizeValue(props.height)

    return style
  })

  // 背景颜色对应的类
  const bgClass = computed<string>(() => {
    const cls: string[] = [ns.e('bg')]

    // 设置背景颜色
    if (bgColorClass.value && !props.frosted) cls.push(bgColorClass.value)

    // 设置毛玻璃效果
    // #ifndef MP-ALIPAY
    if (props.frosted) cls.push(ns.em('bg', 'frosted'))
    // #endif

    return cls.join(' ')
  })
  // 背景颜色对应的样式
  const bgStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置zIndex
    if (props.zIndex) style.zIndex = props.zIndex - 1

    // 设置背景颜色
    if (!bgColorClass.value)
      style.backgroundColor = bgColorStyle.value || 'var(--tn-color-white)'
    // #ifndef MP-ALIPAY
    if (props.frosted)
      style.backgroundColor = bgColorStyle.value || 'rgba(255, 255, 255, 0.5)'
    // #endif

    return style
  })

  // 占位容器对应的样式
  const placeholderStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置zIndex
    if (props.zIndex) style.zIndex = props.zIndex - 2

    // 设置高度
    if (props.height) style.height = formatDomSizeValue(props.height)

    return style
  })

  return {
    ns,
    tabbarClass,
    tabbarStyle,
    bgClass,
    bgStyle,
    placeholderStyle,
  }
}
