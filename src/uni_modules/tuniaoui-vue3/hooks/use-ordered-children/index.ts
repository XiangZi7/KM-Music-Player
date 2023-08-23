import { shallowRef } from 'vue'

export const useOrderedChildren = <T extends { uid: number }>() => {
  const children: Record<number, T> = {}
  const orderedChildren = shallowRef<T[]>([])

  const addChild = (child: T) => {
    children[child.uid] = child
    orderedChildren.value.push(child)
  }
  const removeChild = (uid: number) => {
    delete children[uid]
    orderedChildren.value = orderedChildren.value.filter(
      (child) => child.uid !== uid
    )
  }

  return {
    children: orderedChildren,
    addChild,
    removeChild,
  }
}
