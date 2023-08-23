export function overArg(func: any, transform: any) {
  return function (arg: any) {
    return func(transform(arg))
  }
}
