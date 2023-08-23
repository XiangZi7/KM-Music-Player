import { ref } from 'vue'
import type { Ref } from 'vue'

export const useToggle = (initState: boolean): [Ref<boolean>, () => void] => {
  const state = ref<boolean>(initState)
  const toggle = () => {
    state.value = !state.value
  }

  return [state, toggle]
}
