import { computed, inject } from 'vue'
import { stepsContextKey } from '../../../../tokens'
import { useComponentColor, useNamespace } from '../../../../hooks'

import type { CSSProperties, Ref } from 'vue'
import type { StepProps } from '../steps-item'
import type { StepsMode } from '../steps'

type ModeSelector = 'dot' | 'icon'

type StepModeClass = (selector?: ModeSelector) => string
type StepModeStyle = (selector?: ModeSelector) => CSSProperties

export const useStepCustomStyle = (
  props: StepProps,
  isActive: Ref<boolean>,
  stepMode: Ref<StepsMode>
) => {
  const ns = useNamespace('step')

  const stepsContext = inject(stepsContextKey)

  const normalColor = computed<string | undefined>(
    () => props.color || stepsContext?.color
  )
  const activeColor = computed<string | undefined>(
    () => props.activeColor || stepsContext?.activeColor
  )

  // 解析颜色
  const [textColorClass, textColorStyle] = useComponentColor(
    normalColor,
    'text'
  )
  const [textActiveColorClass, textActiveColorStyle] = useComponentColor(
    activeColor,
    'text'
  )
  const [bgColorClass, bgColorStyle] = useComponentColor(normalColor, 'bg')
  const [bgActiveColorClass, bgActiveColorStyle] = useComponentColor(
    activeColor,
    'bg'
  )

  // step对应的类
  const stepClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    if (isActive.value) cls.push(ns.is('active'))

    // 设置颜色
    if (isActive.value) {
      if (textActiveColorClass.value) cls.push(textActiveColorClass.value)
    } else {
      if (textColorClass.value) cls.push(textColorClass.value)
    }

    return cls.join(' ')
  })
  // step对应的样式
  const stepStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    // 设置颜色
    if (isActive.value) {
      if (!textActiveColorClass.value)
        style.color = textActiveColorStyle.value || 'var(--tn-color-primary)'
    } else {
      if (!textColorClass.value)
        style.color = textColorStyle.value || 'var(--tn-color-gray)'
    }

    return style
  })

  // step-mode对应的类
  const modeClass = computed<StepModeClass>(() => {
    return (selector?: ModeSelector) => {
      const cls: string[] = []

      if (!selector) {
        cls.push(ns.e(`mode-${stepMode.value}`))
      }

      if (stepMode.value === 'dot') {
        if (isActive.value) {
          if (bgActiveColorClass.value) cls.push(bgActiveColorClass.value)
        } else {
          if (bgColorClass.value) cls.push(bgColorClass.value)
        }
      }

      if (stepMode.value === 'number') {
        if (isActive.value) {
          if (bgActiveColorClass.value) cls.push(bgActiveColorClass.value)
        }
      }

      if (stepMode.value === 'dotIcon') {
        if (isActive.value && selector === 'icon') {
          if (textActiveColorClass.value) cls.push(textActiveColorClass.value)
        }
        if (!isActive.value && selector === 'dot') {
          if (bgColorClass.value) cls.push(bgColorClass.value)
        }
      }

      return cls.join(' ')
    }
  })
  // step-mode对应的样式
  const modeStyle = computed<StepModeStyle>(() => {
    return (selector?: ModeSelector) => {
      const style: CSSProperties = {}

      if (stepMode.value === 'dot') {
        if (isActive.value) {
          if (!bgActiveColorClass.value)
            style.backgroundColor =
              bgActiveColorStyle.value || 'var(--tn-color-primary)'
        } else {
          if (!bgColorClass.value)
            style.backgroundColor = bgColorStyle.value || 'var(--tn-color-gray)'
        }
      }

      if (stepMode.value === 'number') {
        if (isActive.value) {
          if (!bgActiveColorClass.value) {
            style.backgroundColor =
              bgActiveColorStyle.value || 'var(--tn-color-primary)'
            style.color = 'var(--tn-color-white)'
          }
        }
      }

      if (stepMode.value === 'dotIcon') {
        if (isActive.value && selector === 'icon') {
          if (!textActiveColorClass.value) {
            style.color =
              textActiveColorStyle.value || 'var(--tn-color-primary)'
          }
        }
        if (!isActive.value && selector === 'dot') {
          if (!bgColorClass.value)
            style.backgroundColor = bgColorStyle.value || 'var(--tn-color-gray)'
        }
      }

      return style
    }
  })

  // step-line对应的类
  const lineClass = computed<string>(() => {
    const cls: string[] = [ns.e('line'), ns.is('no-title', !props.title)]

    if (isActive.value) {
      if (bgActiveColorClass.value) cls.push(bgActiveColorClass.value)
    } else {
      if (bgColorClass.value) cls.push(bgColorClass.value)
    }

    return cls.join(' ')
  })
  // step-line对应的样式
  const lineStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (isActive.value) {
      if (!bgActiveColorClass.value)
        style.backgroundColor =
          bgActiveColorStyle.value || 'var(--tn-color-primary)'
    } else {
      if (!bgColorClass.value)
        style.backgroundColor = bgColorStyle.value || 'var(--tn-color-gray)'
    }

    return style
  })

  return {
    ns,
    stepClass,
    stepStyle,
    modeClass,
    modeStyle,
    lineClass,
    lineStyle,
  }
}
