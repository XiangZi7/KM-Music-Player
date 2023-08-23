import { copyObject } from './_copyObject'
import { getSymbols } from './_getSymbol'

export function copySymbols(source: any, object: any) {
  return copyObject(source, getSymbols(source) as unknown as any, object)
}
