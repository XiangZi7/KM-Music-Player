/**
 * 截取指定长度的数值
 * @param value 待截取的数值
 * @param len 截取的长度
 * @param prefixZero 如果只有一位是否添加0
 * @returns 截取后的数值字符串
 */
export const formatNumber = (
  value: string | number,
  len = 2,
  prefixZero = true
): string => {
  let number: number | string = 0
  // 判断传入的值是什么类型
  if (typeof value === 'string') {
    // 如果为空字符串直接返回
    if (value === '') return value
    number = Number(value)
  } else if (typeof value === 'number') {
    number = value
  }
  if (Number.isNaN(number) || number === 0) return prefixZero ? '00' : '0'
  const maxNumber = Math.pow(10, len) - 1
  if (number > maxNumber) return `${maxNumber}+`
  number = String(number)
  return prefixZero
    ? `00${number}`.slice(Math.max(0, number.length > 2 ? 2 : number.length))
    : number
}
