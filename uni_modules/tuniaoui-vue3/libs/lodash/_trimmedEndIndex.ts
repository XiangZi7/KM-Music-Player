const reWhitespace = /\s/

export function trimmedEndIndex(string: string) {
  let index = string.length

  while (index-- && reWhitespace.test(string.charAt(index))) {
    /* empty */
  }
  return index
}
