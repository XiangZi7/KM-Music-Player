import { buildProps, isString } from '../../../utils'
import { subsectionBaseProps } from '../../base/common-props/subsection'

import type { ExtractPropTypes } from 'vue'

export const subsectionItemProps = buildProps({
  ...subsectionBaseProps,
  /**
   * @description 标题
   */
  title: String,
})

export const subsectionItemEmits = {
  /**
   * @description 点击事件
   */
  click: (title: string) => isString(title),
}

export type SubsectionItemProps = ExtractPropTypes<typeof subsectionItemProps>
export type SubsectionItemEmits = typeof subsectionItemEmits
