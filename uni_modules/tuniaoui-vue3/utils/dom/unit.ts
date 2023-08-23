import { isString } from '../types'

/**
 * 格式化dom的尺寸单位
 * @param value 待处理的值
 * @param unit 默认单位
 * @param empty 是否返回空值
 * @returns 处理后的值
 */
export const formatDomSizeValue = (
  value: string | number,
  unit = 'rpx',
  empty = true
): string => {
  if (!value) return empty ? '' : `0${unit}`
  if (isString(value) && /(^calc)|(%|px|rpx|auto)$/.test(value as string))
    return value as string
  return `${value}${unit}`
}
