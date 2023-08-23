import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../constants'
import { buildProps, definePropType, isArray } from '../../../utils'

import type { ExtractPropTypes } from 'vue'
import type { ImageUploadFile, ImageUploadListItem } from './types'

export const imageUploadSizeTypes = ['original', 'compressed'] as const

export const imageUploadSources = ['album', 'camera'] as const

export const imageExtensions = [
  'jpg',
  'jpeg',
  'png',
  'gif',
  'webp',
  'ico',
] as const

export type ImageUploadCustomFunction = (
  file: ImageUploadFile
) => Promise<string> | string

export type ImageUploadCustomCallbackFunction = (
  data: UniApp.UploadFileSuccessCallbackResult
) => Promise<string> | string

export type ImageBeforeUploadFunction = (
  file: ImageUploadFile
) => boolean | Promise<boolean>

export type ImageBeforeRemoveFunction = (
  file: ImageUploadListItem
) => boolean | Promise<boolean>

export const imageUploadProps = buildProps({
  /**
   * @description 已上传的图片列表绑定值，传递的是图片的url地址
   */
  modelValue: {
    type: definePropType<Array<string>>(Array),
    default: () => [],
  },
  /**
   * @description 禁止上传
   */
  disabled: Boolean,
  /**
   * @description 图片上传地址
   */
  action: String,
  /**
   * @description 图片上传的字段名称
   */
  name: {
    type: String,
    default: 'file',
  },
  /**
   * @description 图片上传的header, header 中不能设置 Referer
   */
  header: {
    type: Object,
    default: () => ({}),
  },
  /**
   * @description 图片上传HTTP 请求中其他额外的 form data
   */
  formData: {
    type: Object,
    default: () => ({}),
  },
  /**
   * @description 最大允许上传个数
   */
  limit: {
    type: Number,
    default: 9,
  },
  /**
   * @description 自动上传
   */
  autoUpload: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 显示删除按钮
   */
  showRemove: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 显示错误提示信息
   */
  showErrorTips: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 显示上传进度条
   */
  showUploadProgress: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 上传图片的SizeType
   */
  sizeType: {
    type: definePropType<Array<ImageUploadSizeType>>(Array),
    default: () => ['original', 'compressed'],
  },
  /**
   * @description 上传图片的来源
   */
  sourceType: {
    type: definePropType<Array<ImageUploadSource>>(Array),
    default: () => ['album', 'camera'],
  },
  /**
   * @description 允许多选图片
   */
  multiple: {
    type: Boolean,
    default: true,
  },
  /**
   * @description 允许上传的最大图片大小，单位为byte
   */
  maxSize: {
    type: Number,
    default: 10 * 1024 * 1024,
  },
  /**
   * @description 允许上传的图片类型
   */
  extensions: {
    type: definePropType<Array<string>>(Array),
    default: () => imageExtensions,
  },
  /**
   * @description 自动移除上传失败的图片
   */
  autoRemoveFaildFile: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 自定义上传函数
   */
  customUploadHandler: {
    type: definePropType<ImageUploadCustomFunction>(Function),
  },
  /**
   * @description 自定义上传回调处理函数
   */
  customUploadCallback: {
    type: definePropType<ImageUploadCustomCallbackFunction>(Function),
  },
  /**
   * @description 上传前的钩子函数
   */
  beforeUpload: {
    type: definePropType<ImageBeforeUploadFunction>(Function),
  },
  /**
   * @description 删除前的钩子函数
   */
  beforeRemove: {
    type: definePropType<ImageBeforeRemoveFunction>(Function),
  },
  /**
   * @description 值发生修改时是否触发表单验证
   */
  validateEvent: {
    type: Boolean,
    default: true,
  },
})

/* eslint-disable @typescript-eslint/no-unused-vars */
export const imageUploadEmits = {
  [UPDATE_MODEL_EVENT]: (value: Array<string>) => isArray(value),
  [CHANGE_EVENT]: (value: Array<string>) => isArray(value),
  /**
   * @description 图片超过最大尺寸或者文件不支持时触发
   */
  oversizeOrNoSupport: (file: Array<ImageUploadFile>) => true,
  /**
   * @description 图片上传成功回调
   */
  success: (file: ImageUploadListItem) => true,
  /**
   * @description 图片上传失败回调
   */
  fail: (error: Error, file: ImageUploadListItem) => true,
  /**
   * @description 图片删除成功回调
   */
  remove: (url: string) => true,
  /**
   * @description 图片预览回调
   */
  preview: (url: string) => true,
}
/* eslint-enable @typescript-eslint/no-unused-vars */

export type ImageUploadProps = ExtractPropTypes<typeof imageUploadProps>
export type ImageUploadEmits = typeof imageUploadEmits

export type ImageUploadSizeType = (typeof imageUploadSizeTypes)[number]
export type ImageUploadSource = (typeof imageUploadSources)[number]
export type ImageExtension = (typeof imageExtensions)[number]
