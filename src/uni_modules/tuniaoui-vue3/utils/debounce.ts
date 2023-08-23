/**
 * 防抖函数
 * @author jaylen
 * @param fn 需要执行的方法
 * @param delay 延迟时间
 * @param immediate 是否立马执行
 * @returns 防抖函数
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number,
  immediate = false
) => {
  let timer: ReturnType<typeof setTimeout> | null = null
  let isInvoke = false
  const _debounce = function (thisArg: any, ...args: Parameters<T>) {
    if (timer) clearTimeout(timer)
    if (immediate && !isInvoke) {
      fn.apply(thisArg, args)
      isInvoke = true
    } else {
      timer = setTimeout(() => {
        fn.apply(thisArg, args)
        isInvoke = false
      }, delay)
    }
  }

  // 取消防抖
  _debounce.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    isInvoke = false
  }

  return _debounce
}
