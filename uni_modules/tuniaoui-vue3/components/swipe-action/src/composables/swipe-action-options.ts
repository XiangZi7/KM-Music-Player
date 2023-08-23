import { computed, ref } from 'vue'
import { useComponentColor } from '../../../../hooks'
import { isEmptyVariableInDefault } from '../../../../utils'

import type { CSSProperties } from 'vue'
import type { SwipeActionItemProps } from '../swipe-action-item'

interface ColorInfo {
  class: string
  style: string
}

interface OptionsData {
  icon: string
  text: string
  textColor: ColorInfo
  bgColor: ColorInfo
  round: boolean
  disabled: boolean
}

type OptionClassValue = (index: number) => string
type OptionStyleValue = (index: number) => CSSProperties

export const useSwipeActionOptions = (props: SwipeActionItemProps) => {
  // 菜单配置项
  const options = computed<OptionsData[]>(() => {
    return props.options.map((item) => {
      const textColor = ref(item.textColor)
      const bgColor = ref(item.bgColor)
      const [textColorClass, textColoeStyle] = useComponentColor(
        textColor,
        'text'
      )
      const [bgColorClass, bgColorStyle] = useComponentColor(bgColor, 'bg')
      return {
        icon: isEmptyVariableInDefault(item.icon, ''),
        text: isEmptyVariableInDefault(item.text, ''),
        textColor: {
          class: textColorClass.value,
          style: textColoeStyle.value,
        },
        bgColor: {
          class: bgColorClass.value,
          style: bgColorStyle.value,
        },
        round: isEmptyVariableInDefault(item.round, false),
        disabled: isEmptyVariableInDefault(item.disabled, false),
      }
    })
  })

  // 菜单配置项颜色对应的类
  const optionColorClass = computed<OptionClassValue>(() => {
    return (index: number) => {
      const cls: string[] = []

      const option = options.value[index]
      if (option) {
        if (option.textColor.class) cls.push(option.textColor.class)
        if (option.bgColor.class) cls.push(option.bgColor.class)
      }

      return cls.join(' ')
    }
  })
  // 菜单配置项颜色对应样式
  const optionColorStyle = computed<OptionStyleValue>(() => {
    return (index: number) => {
      const style: CSSProperties = {}

      const option = options.value[index]

      if (option) {
        if (!option.textColor.class)
          style.color = option.textColor.style || 'var(--tn-color-white)'
        if (!option.bgColor.class)
          style.backgroundColor =
            option.bgColor.style || 'var(--tn-color-primary)'
      }

      return style
    }
  })

  return {
    options,
    optionColorClass,
    optionColorStyle,
  }
}
