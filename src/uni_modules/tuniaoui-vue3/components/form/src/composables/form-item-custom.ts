import { computed, inject, ref } from 'vue'
import { formContextKey } from '../../../../tokens'
import { formatDomSizeValue, generateId } from '../../../../utils'
import { useNamespace, useSelectorQuery } from '../../../../hooks'
import { useFormSize } from './use-form-common-props'

import type { CSSProperties, Ref } from 'vue'
import type { FormItemProps } from '../form-item'

export const useFormItemCustomStyle = (
  props: FormItemProps,
  hasLabel: Ref<boolean>,
  isRequired: Ref<boolean>
) => {
  const form = inject(formContextKey, undefined)

  const ns = useNamespace('form-item')

  const size = useFormSize(undefined, { formItem: false })

  const { getSelectorNodeInfo } = useSelectorQuery()

  // 标签的宽度
  const labelWidth = computed(() =>
    formatDomSizeValue(props.labelWidth || form?.labelWidth || '')
  )

  // 标签的位置
  const labelPosition = computed(
    () => props.labelPosition || form?.labelPosition || 'right'
  )

  // 是否隐藏必填星号
  const hideRequiredAsterisk = computed(
    () => form?.hideRequiredAsterisk || false
  )

  // 必填星号的位置
  const requireAsteriskPosition = computed(
    () => form?.requireAsteriskPosition || 'left'
  )

  // label标签容器宽度
  const labelContainerWidth = ref(0)
  const labelId = `label-${generateId()}`

  // 获取label标签的宽度
  const initLabelContainerWidth = () => {
    getSelectorNodeInfo(`#${labelId}`).then((res) => {
      labelContainerWidth.value = res?.width || 0
    })
  }

  // formItem所属类
  const formItemClass = computed<string>(() => {
    const cls: string[] = [ns.b()]

    if (size.value) cls.push(ns.m(size.value))

    if (labelPosition.value) cls.push(ns.m(`label-${labelPosition.value}`))

    return cls.join(' ')
  })

  // formItemLabel所属类
  const formItemLabelClass = computed<string>(() => {
    const cls: string[] = [ns.e('label')]
    if (!hideRequiredAsterisk.value && isRequired.value) {
      cls.push(
        ns.em('label', 'required'),
        ns.em('label', `asterisk-${requireAsteriskPosition.value}`)
      )
    }
    return cls.join(' ')
  })

  // formItemLabel所属样式
  const formItemLabelStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}
    if (labelPosition.value !== 'top' && labelWidth.value)
      style.width = labelWidth.value
    return style
  })

  // formItemErrorMessage所属样式
  const formItemErrorMessageStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}
    if (labelPosition.value !== 'top' && hasLabel.value) {
      style.paddingLeft = `${labelContainerWidth.value}px`
    }
    return style
  })

  return {
    ns,
    labelId,
    formItemClass,
    formItemLabelClass,
    formItemLabelStyle,
    formItemErrorMessageStyle,
    initLabelContainerWidth,
  }
}
