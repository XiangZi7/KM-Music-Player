import { isString } from '@vue/shared'

class TuniaoUIError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'TuniaoUIError'
  }
}

export function throwError(scope: string, msg: string): never {
  throw new TuniaoUIError(`[${scope}] ${msg}`)
}

export function debugWarn(err: Error): void
export function debugWarn(scope: string, message: string): void
export function debugWarn(scope: string | Error, message?: string): void {
  if (process.env.NODE_ENV !== 'production') {
    const error: Error = isString(scope)
      ? new TuniaoUIError(`[${scope}] ${message}`)
      : scope
    // eslint-disable-next-line no-console
    console.warn(error)
  }
}
