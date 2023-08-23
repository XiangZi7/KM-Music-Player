export function baseTimes(n: any, iteratee: any) {
  let index = -1
  const result = Array.from({ length: n })

  while (++index < n) {
    result[index] = iteratee(index)
  }
  return result
}
