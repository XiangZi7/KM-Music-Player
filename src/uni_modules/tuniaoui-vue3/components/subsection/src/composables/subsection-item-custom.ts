import { computed, inject, toRef } from 'vue'
import { subsectionContextKey } from '../../../../tokens'
import { useComponentColor, useNamespace } from '../../../../hooks'
import {
  isEmptyDoubleVariableInDefault,
  isEmptyVariableInDefault,
} from '../../../../utils'

import type { CSSProperties, Ref } from 'vue'
import type { SubsectionMode } from '../subsection'
import type { SubsectionItemProps } from '../subsection-item'

export const useSubsectionItemCustomStyle = (
  props: SubsectionItemProps,
  active: Ref<boolean>
) => {
  const subsectionContext = inject(subsectionContextKey)

  const ns = useNamespace('subsection-item')

  const activeColor = computed<string>(() =>
    isEmptyDoubleVariableInDefault(
      props.activeColor,
      subsectionContext?.activeColor,
      ''
    )
  )
  const subsectionMode = computed<SubsectionMode>(() =>
    isEmptyVariableInDefault(subsectionContext?.mode, 'default')
  )
  const disabled = computed<boolean>(
    () => subsectionContext?.disabled || props.disabled || false
  )

  // 解析颜色
  const [activeTextColorClass, activeTextColorStyle] = useComponentColor(
    activeColor,
    'text'
  )
  const [activeBorderColorClass, activeBorderColorStyle] = useComponentColor(
    toRef(subsectionContext!, 'activeColor'),
    'border'
  )

  // 分段器Item的类
  const subsectionItemClass = computed<string>(() => {
    const cls: string[] = [
      ns.b(),
      ns.m(subsectionMode.value),
      ns.is('active', active.value),
      ns.is('disabled', disabled.value),
    ]

    if (subsectionMode.value === 'default') {
      if (activeBorderColorClass.value) cls.push(activeBorderColorClass.value)
    }

    if (subsectionMode.value === 'button') {
      if (active.value) {
        if (activeTextColorClass.value) cls.push(activeTextColorClass.value)
      }
    }

    return cls.join(' ')
  })
  // 分段器Item的样式
  const subsectionItemStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (subsectionMode.value === 'default') {
      if (!activeBorderColorClass.value)
        style.borderColor =
          activeBorderColorStyle.value || 'var(--tn-color-primary)'
      if (active.value) {
        style.color = 'var(--tn-color-white)'
      }
    }

    if (subsectionMode.value === 'button') {
      if (active.value) {
        if (!activeTextColorClass.value)
          style.color = activeTextColorStyle.value || 'var(--tn-color-primary)'
      }
    }

    return style
  })

  return {
    ns,
    subsectionItemClass,
    subsectionItemStyle,
  }
}
