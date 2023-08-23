import { computed } from 'vue'
import { useNamespace } from '../../../../hooks'

export const useFormCustomStyle = () => {
  const ns = useNamespace('form')

  const formClass = computed<string>(() => {
    const cls: string[] = [ns.b()]
    return cls.join(' ')
  })

  return {
    formClass,
  }
}
