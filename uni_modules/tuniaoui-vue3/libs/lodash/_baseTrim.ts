import { trimmedEndIndex } from './_trimmedEndIndex'

const reTrimStart = /^\s+/

export function baseTrim(string: string) {
  return string
    ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
    : string
}
