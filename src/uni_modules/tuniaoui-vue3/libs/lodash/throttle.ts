import { isObject } from '@vue/shared'
import { debounce } from './debounce'

import type { DebouncedFunc, ThrottleSettings } from './_common'

const FUNC_ERROR_TEXT = 'Expected a function'

export function throttle<T extends (...args: any) => any>(
  func: T,
  wait?: number,
  options?: ThrottleSettings
): DebouncedFunc<T> {
  let leading = true,
    trailing = true

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT)
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading
    trailing = 'trailing' in options ? !!options.trailing : trailing
  }
  return debounce(func, wait, {
    leading,
    maxWait: wait,
    trailing,
  })
}
