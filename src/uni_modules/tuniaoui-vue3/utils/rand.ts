/**
 * 生成0～10000的随机数
 */
export const generateId = (): number => Math.floor(Math.random() * 10000)

/**
 * 生成随机数（0 ～ max）
 * @param max 最大值
 * @returns 随机数
 */
export const getRandomInt = (max: number) =>
  Math.floor(Math.random() * Math.floor(max))
