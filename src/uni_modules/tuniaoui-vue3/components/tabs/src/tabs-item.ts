import { buildProps, definePropType } from '../../../utils'
import { tabsBaseProps } from '../../base/common-props/tabs'

import type { ExtractPropTypes } from 'vue'
import type { BadgeProps } from '../../badge'

export type TabsItemBadgeConfig = Partial<Pick<BadgeProps, 'dot'>> & {
  value?: string | number
}

export const tabsItemProps = buildProps({
  ...tabsBaseProps,
  /**
   * @description 标题
   */
  title: {
    type: String,
    required: true,
  },
  /**
   * @description 角标配置
   */
  badgeConfig: {
    type: definePropType<TabsItemBadgeConfig>(Object),
    default: () => ({}),
  },
  /**
   * @description 是否禁用
   */
  disabled: Boolean,
})

export const tabsItemEmits = {
  /**
   * @description 点击事件
   */
  click: () => true,
}

export type TabsItemProps = ExtractPropTypes<typeof tabsItemProps>
export type TabsItemEmits = typeof tabsItemEmits
