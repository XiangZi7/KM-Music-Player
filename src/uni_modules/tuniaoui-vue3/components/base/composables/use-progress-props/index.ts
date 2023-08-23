import { ref, toRef, watch } from 'vue'
import { useComponentColor } from '../../../../hooks'

import type { ProgressBaseProps } from '../../common-props/progress'

interface ProgressPropsType extends ProgressBaseProps {
  [key: string]: any
}

export const useProgressProps = (props: ProgressPropsType) => {
  const [activeColorClass, activeColorStyle] = useComponentColor(
    toRef(props, 'activeColor'),
    'bg'
  )
  const [inactiveColorClass, inactiveColorStyle] = useComponentColor(
    toRef(props, 'inactiveColor'),
    'bg'
  )

  // 当前的进度百分比
  const percent = ref(0)
  let firstInitPercent = true
  // 为了有动画效果，需要在下一次渲染时再设置进度条的长度
  watch(
    () => props.percent,
    (val) => {
      if (!firstInitPercent) {
        percent.value = val
      } else {
        setTimeout(() => {
          percent.value = val
          firstInitPercent = false
        }, 50)
      }
    },
    {
      immediate: true,
    }
  )

  return {
    percent,
    activeColorClass,
    activeColorStyle,
    inactiveColorClass,
    inactiveColorStyle,
  }
}
