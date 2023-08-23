export type Many<T> = T | ReadonlyArray<T>
export type PropertyName = string | number | symbol
export type PropertyPath = Many<PropertyName>

export interface DebounceSettings {
  leading?: boolean | undefined
  maxWait?: number | undefined
  trailing?: boolean | undefined
}

export interface ThrottleSettings {
  leading?: boolean | undefined
  trailing?: boolean | undefined
}

export interface DebouncedFunc<T extends (...args: any[]) => any> {
  (...args: Parameters<T>): ReturnType<T> | undefined
  cancel(): void
  flush(): ReturnType<T> | undefined
}

export const reIsPlainProp = /^\w*$/
export const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/
export const reLeadingDot = /^\./
export const rePropName =
  /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g
export const reEscapeChar = /\\(\\)?/g
export const reIsUint = /^(?:0|[1-9]\d*)$/

export const INFINITY = 1 / 0
export const MAX_SAFE_INTEGER = 9007199254740991
