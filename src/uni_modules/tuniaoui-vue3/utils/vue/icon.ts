import { definePropType } from './props'

export const iconPropType = definePropType<string>([String])

export const FormValidateIconsMap = {
  validating: 'loading',
  success: 'success-circle',
  error: 'close-circle',
}
