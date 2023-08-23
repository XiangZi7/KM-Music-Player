import { toString } from './_toString'
import { reEscapeChar, reLeadingDot, rePropName } from './_common'

import type { PropertyName } from './_common'

export const stringToPath = function (string: PropertyName) {
  string = toString(string)

  const result = []
  if (reLeadingDot.test(string)) {
    result.push('')
  }
  string.replace(
    rePropName,
    (match: string, number: any, quote: any, string: any) => {
      result.push(quote ? string.replace(reEscapeChar, '$1') : number || match)
      return ''
    }
  )
  return result
}
