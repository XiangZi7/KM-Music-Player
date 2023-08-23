import { buildProps, definePropType, isString } from '../../../utils'

import type { ExtractPropTypes } from 'vue'

export interface IndexListDataItemData {
  star?: boolean
  [key: string]: any
}

export interface IndexListDataItem {
  title: string
  data: IndexListDataItemData[]
}

const indexListKeys = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
  '#',
] as const
export type IndexListKeys = (typeof indexListKeys)[number]

export type IndexListData = Partial<Record<IndexListKeys, IndexListDataItem>>

export const indexListProps = buildProps({
  /**
   * @description 数据源
   */
  data: {
    type: definePropType<IndexListData>(Object),
    default: () => ({}),
  },
  /**
   * @description 索引列表的高度，单位 `px`，不传值则以当前窗口的高度为准
   */
  height: Number,
  /**
   * @description 标题吸顶距离，单位 `px`
   */
  stickyOffsetTop: {
    type: Number,
    default: 0,
  },
  /**
   * @description 标题背景颜色，以tn开头使用图鸟内置的颜色
   */
  titleBgColor: String,
  /**
   * @description 标题文字颜色，以tn开头使用图鸟内置的颜色
   */
  titleColor: String,
  /**
   * @description 标题尺寸，内置 `sm`、`lg`、`xl`，同时也可以传递指定的尺寸的值
   */
  titleSize: String,
  /**
   * @description 是否显示右侧索引列表
   */
  showKeysList: {
    type: Boolean,
    default: true,
  },
})

export const indexListEmits = {
  /**
   * @description 点击索引列表时触发
   */
  click: (key: IndexListKeys) => isString(key),
}

export type IndexListProps = ExtractPropTypes<typeof indexListProps>
export type IndexListEmits = typeof indexListEmits
