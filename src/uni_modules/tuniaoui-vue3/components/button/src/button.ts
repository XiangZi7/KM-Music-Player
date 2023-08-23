import { buildProps, iconPropType } from '../../../utils'
import { componentShapes, componentTypes } from '../../../constants'
import {
  useComponentCustomStyleProp,
  useComponentSizeProp,
} from '../../base/composables/use-component-common-props'
import type { ExtractPropTypes } from 'vue'

/**
 * 按钮FormType有效值
 */
export const buttonFormTypes = ['submit', 'reset'] as const

/**
 * 按钮OpenType有效值
 */
export const buttonOpenTypes = [
  'feedback',
  'share',
  'contact',
  'getPhoneNumber',
  'launchApp',
  'openSetting',
] as const

/**
 * 获取手机号码函数回调参数
 */
export interface GetPhoneNumber {
  detail: {
    /** 动态令牌, 可通过动态令牌换取用户手机号 */
    code: string
  }
}

export const buttonProps = buildProps({
  /**
   * @description 按钮宽度
   */
  width: {
    type: [String, Number],
  },
  /**
   * @description 按钮高度
   */
  height: {
    type: [String, Number],
  },
  /**
   * @description 按钮尺寸
   */
  size: useComponentSizeProp,
  /**
   * @description 按钮形状
   */
  shape: {
    type: String,
    values: componentShapes,
    default: '',
  },
  /**
   * @description 按钮颜色类型
   */
  type: {
    type: String,
    values: componentTypes,
    default: 'primary',
  },
  /**
   * @description 按钮图标
   */
  icon: {
    type: iconPropType,
  },
  /**
   * @description 是否加粗字体
   */
  bold: Boolean,
  /**
   * @description 字体大小
   */
  fontSize: {
    type: [String, Number],
  },
  /**
   * @description 背景颜色，以tn开头则使用图鸟内置的颜色
   */
  bgColor: String,
  /**
   * @description 文字颜色，以tn开头则使用图鸟内置的颜色
   */
  textColor: String,
  /**
   * @description 是否显示为文本按钮
   */
  text: Boolean,
  /**
   * @description 是否为朴素按钮
   */
  plain: Boolean,
  /**
   * @description 边框颜色，以tn开头则使用图鸟内置的颜色
   */
  borderColor: String,
  /**
   * @description 是否加粗边框
   */
  borderBold: Boolean,
  /**
   * @description 是否显示阴影
   */
  shadow: Boolean,
  /**
   * @description 阴影颜色，以tn开头则使用图鸟内置的颜色
   */
  shadowColor: String,
  /**
   * @description 点击时触发的类
   */
  hoverClass: {
    type: String,
    default: 'tn-u-btn-hover',
  },
  /**
   * @description 自定义样式
   */
  customStyle: useComponentCustomStyleProp,
  /**
   * @description 自定义类
   */
  customClass: String,
  /**
   * @description 是否禁用按钮
   */
  disabled: Boolean,
  /**
   * @description 是否显示加载中
   */
  loading: Boolean,
  /**
   * @description 是否防抖
   */
  debounce: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 触发form表单的事件类型
   */
  formType: {
    type: String,
    values: buttonFormTypes,
  },
  /**
   * @description 按钮开放能力，具体能力参考官网https://uniapp.dcloud.io/component/button.html
   */
  openType: {
    type: String,
    values: buttonOpenTypes,
  },
  /**
   * @description 打开app时向app传递的参数, 在微信、QQ小程序和openType为launchApp时生效
   */
  appParameter: {
    type: String,
    default: '',
  },
  /**
   * @description 会话来源, 在微信小程序和openType为contact时生效
   */
  sessionFrom: {
    type: String,
    default: '',
  },
  /**
   * @description 会话内消息卡片标题, 默认为当前标题, 在微信小程序和openType为contact时生效
   */
  sendMessageTitle: {
    type: String,
    default: '',
  },
  /**
   * @description 会话内消息卡片点击跳转小程序路径, 默认为当前路径, 在微信小程序和openType为contact时生效
   */
  sendMessagePath: {
    type: String,
    default: '',
  },
  /**
   * @description 会话内消息卡片图片, 默认为截图, 在微信小程序和openType为contact时生效
   */
  sendMessageImg: {
    type: String,
    default: '',
  },
  /**
   * @description 是否显示会话内消息卡片, 设置此参数为true, 用户进入客服会话会在右下角显示"可能要发送的小程序"提示, 用户点击后可以快速发送小程序消息, 在微信小程序和openType为contact时生效
   */
  showMessageCard: {
    type: Boolean,
    default: false,
  },
})
export const buttonEmits = {
  /**
   * @description 按钮点击事件
   */
  click: () => true,
  /**
   * @description 获取用户手机号码回调
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getphonenumber: (e: GetPhoneNumber) => true,
  /**
   * @description 开放能力调用发生错误时回调
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error: (e: any) => true,
  /**
   * @description 打开权限设置面板并关闭时回调
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  opensetting: (e: any) => true,
  /**
   * @description 打开APP成功时回调
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  launchapp: (e: any) => true,
}

export type ButtonProps = ExtractPropTypes<typeof buttonProps>
export type ButtonEmits = typeof buttonEmits

export type ButtonFormType = ButtonProps['formType']
export type ButtonOpenType = ButtonProps['openType']
