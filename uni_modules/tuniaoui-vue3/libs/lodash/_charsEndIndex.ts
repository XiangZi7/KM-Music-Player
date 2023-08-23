import { baseIndexOf } from './_baseIndexOf'

export function charsEndIndex(strSymbols: string[], chrSymbols: string[]) {
  let index = strSymbols.length

  while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {
    /* empty */
  }
  return index
}
