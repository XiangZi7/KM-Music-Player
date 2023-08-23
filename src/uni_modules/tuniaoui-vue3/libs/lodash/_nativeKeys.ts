import { overArg } from './_overArg'

const nativeKeys = overArg(Object.keys, Object)

export { nativeKeys }
