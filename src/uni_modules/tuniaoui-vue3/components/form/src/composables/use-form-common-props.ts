import { computed, inject, ref, unref } from 'vue'
import { useProp } from '../../../../hooks'
import { formContextKey, formItemContextKey } from '../../../../tokens'

import type { FormComponentSize } from '../../../../constants'
import type { MaybeRef } from '../../../../utils'

/* 表单尺寸 */
export const useFormSize = (
  fallback?: MaybeRef<FormComponentSize | undefined>,
  ignore: Partial<Record<'prop' | 'form' | 'formItem' | 'global', boolean>> = {}
) => {
  const emptyRef = ref(undefined)

  const size = ignore.prop ? emptyRef : useProp<FormComponentSize>('size')
  const form = ignore.form
    ? { size: undefined }
    : inject(formContextKey, undefined)
  const formItem = ignore.formItem
    ? { size: undefined }
    : inject(formItemContextKey, undefined)

  return computed(
    (): FormComponentSize =>
      size.value || unref(fallback) || formItem?.size || form?.size || ''
  )
}

/* 表单是否禁用 */
export const useFormDisabled = (fallback?: MaybeRef<boolean | undefined>) => {
  const disabled = useProp<boolean>('disabled')
  const form = inject(formContextKey, undefined)
  return computed(
    () => disabled.value || unref(fallback) || form?.disabled || false
  )
}
