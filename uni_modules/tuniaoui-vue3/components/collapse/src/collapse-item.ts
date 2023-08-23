import { buildProps } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export const collapseItemProps = buildProps({
  /**
   * @description CollapseItem标题
   */
  title: String,
  /**
   * @description CollapseItem是否禁用
   */
  disabled: Boolean,
})

export type CollapseItemProps = ExtractPropTypes<typeof collapseItemProps>
