import { baseIndexOf } from './_baseIndexOf'

export function charsStartIndex(strSymbols: string[], chrSymbols: string[]) {
  let index = -1
  const length = strSymbols.length

  while (
    ++index < length &&
    baseIndexOf(chrSymbols, strSymbols[index], 0) > -1
  ) {
    /* empty */
  }
  return index
}
