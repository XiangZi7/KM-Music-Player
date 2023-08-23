import { asciiToArray } from './_asciiToArray'
import { hasUnicode } from './_hasUnicode'
import { unicodeToArray } from './_unicodeToArray'

export function stringToArray(string: string) {
  return hasUnicode(string) ? unicodeToArray(string) : asciiToArray(string)
}
