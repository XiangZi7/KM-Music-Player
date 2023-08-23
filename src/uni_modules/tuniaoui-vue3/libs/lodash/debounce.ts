import { isObject } from '@vue/shared'
import { toNumber } from './_toNumber'

import type { DebounceSettings, DebouncedFunc } from './_common'

const FUNC_ERROR_TEXT = 'Expected a function'

export function debounce<T extends (...args: any) => any>(
  func: T,
  wait?: number,
  options?: DebounceSettings
): DebouncedFunc<T> {
  let lastArgs: any
  let lastThis: any
  let maxWait: any
  let result: any
  let timerId: any
  let lastCallTime: any
  let lastInvokeTime = 0
  let leading = false
  let maxing = false
  let trailing = true

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT)
  }
  wait = toNumber(wait) || 0
  if (isObject(options)) {
    leading = !!options.leading
    maxing = 'maxWait' in options
    maxWait = maxing
      ? Math.max(toNumber(options.maxWait) || 0, wait as number)
      : maxWait
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }

  function invokeFunc(time: number) {
    const args = lastArgs,
      thisArg = lastThis

    lastArgs = lastThis = undefined
    lastInvokeTime = time
    result = func.apply(thisArg, args)
    return result
  }

  function leadingEdge(time: number) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait)
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result
  }

  function remainingWait(time: number) {
    const timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime,
      result = (wait as number) - timeSinceLastCall

    return maxing ? Math.max(result, maxWait - timeSinceLastInvoke) : result
  }

  function shouldInvoke(time: number) {
    const timeSinceLastCall = time - lastCallTime,
      timeSinceLastInvoke = time - lastInvokeTime

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= (wait as number) ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    )
  }

  function timerExpired() {
    const time = Date.now()
    if (shouldInvoke(time)) {
      return trailingEdge(time)
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time))
  }

  function trailingEdge(time: number) {
    timerId = undefined

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time)
    }
    lastArgs = lastThis = undefined
    return result
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId)
    }
    lastInvokeTime = 0
    lastArgs = lastCallTime = lastThis = timerId = undefined
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now())
  }

  function debounced(this: any) {
    const time = Date.now(),
      isInvoking = shouldInvoke(time)

    // eslint-disable-next-line prefer-rest-params
    lastArgs = arguments
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    lastThis = this
    lastCallTime = time

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime)
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait)
        return invokeFunc(lastCallTime)
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait)
    }
    return result
  }

  debounced.cancel = cancel
  debounced.flush = flush
  return debounced
}
