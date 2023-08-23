import { addMapEntry } from './_addMapEntry'
import { arrayReduce } from './_arrayReduce'
import { mapToArray } from './_mapToArray'

export function cloneMap(map: any, isDeep: any, cloneFunc: any) {
  const array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map)
  return arrayReduce(array, addMapEntry, new map.constructor())
}
