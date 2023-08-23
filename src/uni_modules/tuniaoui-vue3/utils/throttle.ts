interface ThrottleOptions {
  leading: boolean
  trailing: boolean
}

/**
 * 节流函数
 * @author jaylen
 * @param fn 节流执行函数
 * @param interval 间隔时间
 * @param option 配置参数
 * @returns 节流函数
 */
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  interval: number,
  option: ThrottleOptions
) => {
  const { leading, trailing } = option
  let lastTime = 0
  let timer: ReturnType<typeof setTimeout> | null = null

  const _throttle = function (
    thisArg: ThisParameterType<T>,
    ...args: Parameters<T>
  ) {
    const nowTime: number = Date.now()
    // 判断是否需要第一次执行
    if (!lastTime && !leading) lastTime = nowTime
    // 剩余执行时间
    const remainTime = interval - (nowTime - lastTime)
    if (remainTime <= 0) {
      // 如果当前已经触发执行了，但是事件还没有达到时间间隔，那么就清除定时器
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
      fn.apply(thisArg, args)
      lastTime = nowTime
      return
    }

    // 是否需要执行最后一次
    if (trailing && !timer) {
      timer = setTimeout(() => {
        fn.apply(thisArg, args)
        timer = null
        lastTime = leading ? Date.now() : 0
      }, remainTime)
    }
  }

  // 取消节流
  _throttle.cancel = function () {
    if (timer) clearTimeout(timer)
    timer = null
    lastTime = 0
  }

  return _throttle
}
