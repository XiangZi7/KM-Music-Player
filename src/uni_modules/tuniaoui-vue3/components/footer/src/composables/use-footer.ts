import { computed, ref } from 'vue'
import { useComponentColor } from '../../../../hooks'
import { isEmptyDoubleVariableInDefault } from '../../../../utils'

import type { SetupContext } from 'vue'
import type { FooterEmits, FooterProps } from '../footer'
import type { FooterNavigatorData, FooterNavigatorItem } from '../types'

export const useFooter = (
  props: FooterProps,
  emits: SetupContext<FooterEmits>['emit']
) => {
  // 导航数据
  const navigatorData = computed<FooterNavigatorData>(() => {
    return props.navigator.map((nav) => {
      const textColor = ref(
        isEmptyDoubleVariableInDefault(nav.textColor, props.navigatorTextColor)
      )
      const [textColorClass, textColorStyle] = useComponentColor(
        textColor,
        'text'
      )
      return {
        title: nav.title || '',
        url: nav?.url || '',
        color: {
          class: textColorClass.value,
          style: textColorStyle.value,
        },
      }
    })
  })

  // 页脚点击事件
  const footerClickEvent = () => {
    emits('click')
  }

  // 页脚导航点击事件
  const navigatorClickEvent = (item: FooterNavigatorItem) => {
    emits('navigatorClick', item)
  }

  return {
    navigatorData,
    footerClickEvent,
    navigatorClickEvent,
  }
}
