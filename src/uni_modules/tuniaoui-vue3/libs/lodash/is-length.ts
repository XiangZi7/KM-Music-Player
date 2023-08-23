import { MAX_SAFE_INTEGER } from './_common'

export function isLength(value: any) {
  return (
    typeof value == 'number' &&
    value > -1 &&
    value % 1 == 0 &&
    value <= MAX_SAFE_INTEGER
  )
}
