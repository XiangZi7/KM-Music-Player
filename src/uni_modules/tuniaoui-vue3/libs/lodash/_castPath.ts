import { stringToPath } from './_stringToPath'

import type { PropertyName, PropertyPath } from './_common'

export function castPath(value: PropertyPath) {
  return Array.isArray(value) ? value : stringToPath(value as PropertyName)
}
