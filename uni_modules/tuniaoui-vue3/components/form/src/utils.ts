import { castArray } from '../../../libs/lodash'

import type { Arrayable } from '../../../utils'
import type { FormItemContext } from './types'
import type { FormItemProp } from './form-item'

export const filterFields = (
  fields: FormItemContext[],
  props: Arrayable<FormItemProp>
) => {
  const normalized = castArray(props)
  return normalized.length > 0
    ? fields.filter((field) => field.prop && normalized.includes(field.prop))
    : fields
}
