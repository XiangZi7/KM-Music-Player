import type { InjectionKey } from 'vue'
import type { RadioGroupProps } from '../components'

export interface RadioGroupContext extends RadioGroupProps {
  changeEvent: (val: RadioGroupProps['modelValue']) => void
}

export const radioGroupKey: InjectionKey<RadioGroupContext> =
  Symbol('radioGroupKey')
