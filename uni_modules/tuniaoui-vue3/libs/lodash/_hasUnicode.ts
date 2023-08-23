const rsAstralRange = '\\ud800-\\udfff',
  rsComboMarksRange = '\\u0300-\\u036f',
  reComboHalfMarksRange = '\\ufe20-\\ufe2f',
  rsComboSymbolsRange = '\\u20d0-\\u20ff',
  rsComboRange =
    rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
  rsVarRange = '\\ufe0e\\ufe0f'

/** Used to compose unicode capture groups. */
const rsZWJ = '\\u200d'

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
// eslint-disable-next-line no-misleading-character-class
const reHasUnicode = new RegExp(
  `[${rsZWJ}${rsAstralRange}${rsComboRange}${rsVarRange}]`
)

export function hasUnicode(string: string) {
  return reHasUnicode.test(string)
}
