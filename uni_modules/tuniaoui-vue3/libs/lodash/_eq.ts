export function eq(value: any, other: any) {
  return value === other || (value !== value && other !== other)
}
