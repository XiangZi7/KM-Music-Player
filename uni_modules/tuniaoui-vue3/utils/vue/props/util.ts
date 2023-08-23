export type Writable<T> = { -readonly [P in keyof T]: T[P] }
export type WriteableArray<T> = T extends readonly any[] ? Writable<T> : T

export type IfNever<T, Y = true, N = false> = [T] extends [never] ? Y : N

export type IfUnknown<T, Y, N> = [unknown] extends [T] ? Y : N

export type UnknowToNever<T> = IfUnknown<T, never, T>

export {}
