import { toString } from './_toString'
import { baseTrim } from './_baseTrim'
import { baseToString } from './_baseToString'
import { stringToArray } from './_stringToArray'
import { charsStartIndex } from './_charStartIndex'
import { charsEndIndex } from './_charsEndIndex'
import { castSlice } from './_castSlice'

export function trim(string: string, chars?: string): string {
  string = toString(string)

  if (string && chars === undefined) {
    return baseTrim(string)
  }
  if (!string || !(chars = baseToString(chars as string))) {
    return string
  }

  const strSymbols = stringToArray(string),
    chrSymbols = stringToArray(chars),
    start = charsStartIndex(strSymbols, chrSymbols),
    end = charsEndIndex(strSymbols, chrSymbols) + 1

  return castSlice(strSymbols, start, end).join('')
}
