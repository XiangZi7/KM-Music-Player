export function mapToArray(map: any) {
  let index = -1
  const result = Array.from({ length: map.size })

  map.forEach((value: any, key: any) => {
    result[++index] = [key, value]
  })
  return result
}
