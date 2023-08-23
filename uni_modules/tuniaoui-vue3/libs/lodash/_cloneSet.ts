import { addSetEntry } from './_addSetEntry'
import { arrayReduce } from './_arrayReduce'
import { setToArray } from './_setToArray'

export function cloneSet(set: any, isDeep: any, cloneFunc: any) {
  const array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set)
  return arrayReduce(array, addSetEntry, new set.constructor())
}
