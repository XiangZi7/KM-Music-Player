import { computed } from 'vue'
import { useNamespace } from '../../../../hooks'
import { isEmptyVariableInDefault } from '../../../../utils'

import type { CSSProperties, SetupContext } from 'vue'
import type { OverlayEmits, OverlayProps } from '../overlay'

export const useOverlay = (
  props: OverlayProps,
  emits: SetupContext<OverlayEmits>['emit']
) => {
  const ns = useNamespace('overlay')

  // 遮罩层对应的类
  const overlayClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    // 是否显示组件
    if (props.show) cls.push(ns.m('show'))

    return cls.join(' ')
  })

  // 遮罩层样式
  const overlayStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 动画执行时间
    style.transitionDuration = `${isEmptyVariableInDefault(
      props.duration,
      300
    )}ms`

    // 遮罩层透明度
    style.backgroundColor = `rgba(0, 0, 0, ${isEmptyVariableInDefault(
      props.opacity,
      0.5
    )})`

    // 设置zIndex
    if (props.zIndex) style.zIndex = props.zIndex

    return style
  })

  // 遮罩点击事件
  const overlayClick = () => {
    emits('update:show', false)
    emits('click')
  }

  return {
    ns,
    overlayClass,
    overlayStyle,
    overlayClick,
  }
}
