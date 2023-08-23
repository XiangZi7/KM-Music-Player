export function setToArray(set: any) {
  let index = -1
  const result = Array.from({ length: set.size })

  set.forEach((value: any) => {
    result[++index] = value
  })
  return result
}
