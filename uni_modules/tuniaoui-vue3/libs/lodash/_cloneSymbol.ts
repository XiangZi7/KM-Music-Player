const symbolProto = Symbol ? Symbol.prototype : undefined,
  symbolValueOf = symbolProto ? symbolProto.valueOf : undefined

export function cloneSymbol(symbol: any) {
  return symbolValueOf ? new Object(symbolValueOf.call(symbol)) : {}
}
