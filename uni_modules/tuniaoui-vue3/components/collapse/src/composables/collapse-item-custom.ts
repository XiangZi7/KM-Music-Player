import { computed, inject, toRef } from 'vue'
import { collapseContextKey } from '../../../../tokens'
import { useComponentColor, useNamespace } from '../../../../hooks'

import type { CSSProperties } from 'vue'

export const useCollapseItemCustomStyle = () => {
  const ns = useNamespace('collapse-item')

  const collapse = inject(collapseContextKey)

  // 解析颜色
  const [arrowColorClass, arrowColorStyle] = useComponentColor(
    toRef(collapse!, 'arrowColor'),
    'text'
  )

  // 折叠面板图标对应样式
  const arrowClass = computed<string>(() => {
    const cls: string[] = []

    if (arrowColorClass.value) cls.push(arrowColorClass.value)

    return cls.join(' ')
  })
  // 折叠面板图标对应样式
  const arrowStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (!arrowColorClass.value)
      style.color = arrowColorStyle.value || 'var(--tn-color-gray)'

    return style
  })

  return {
    ns,
    arrowClass,
    arrowStyle,
  }
}
