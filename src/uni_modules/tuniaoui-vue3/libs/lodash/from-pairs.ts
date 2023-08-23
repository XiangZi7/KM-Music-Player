type List<T> = ArrayLike<T>
type PropertyName = string | number | symbol
interface Dictionary<T> {
  [index: string]: T
}

export function fromPairs<T>(
  pairs: List<[PropertyName, T]> | null | undefined
): Dictionary<T>
export function fromPairs(
  pairs: List<any[]> | null | undefined
): Dictionary<any> {
  const result = {}
  if (pairs == null) {
    return result
  }
  for (const pair of pairs) {
    result[pair[0]] = pair[1]
  }
  return result
}
