import { computed, getCurrentInstance } from 'vue'
import { isEmptyVariableInDefault } from '../../utils'
import type { ComputedRef } from 'vue'

export const useProp = <T>(name: string): ComputedRef<T | undefined> => {
  const vm = getCurrentInstance()
  return computed(
    () => isEmptyVariableInDefault(vm?.proxy?.$props as any)[name]
  )
}
