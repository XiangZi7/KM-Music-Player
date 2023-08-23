import { useNamespace } from '../../../../hooks'

export const useStepsCustomStyle = () => {
  const ns = useNamespace('steps')

  return {
    ns,
  }
}
