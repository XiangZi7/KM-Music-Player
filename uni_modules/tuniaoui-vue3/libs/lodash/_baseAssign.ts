import { copyObject } from './_copyObject'
import { keys } from './keys'

export function baseAssign(object: any, source: any) {
  return object && copyObject(source, keys(source), object)
}
