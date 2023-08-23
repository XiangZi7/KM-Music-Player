export const isEmptyVariableInDefault = <T = any>(
  variable: any,
  defaultValue: any = undefined
): T => {
  return variable === undefined || variable === null ? defaultValue : variable
}

export const isEmptyDoubleVariableInDefault = <T = any>(
  variable1: any,
  variable2: any,
  defaultValue: any = undefined
): T => {
  return isEmptyVariableInDefault(
    variable1,
    isEmptyVariableInDefault(variable2, defaultValue)
  )
}
