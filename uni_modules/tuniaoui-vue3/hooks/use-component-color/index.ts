import { ref, watch } from 'vue'
import type { Ref } from 'vue'
import type { TuniaoColorName } from '../../constants'

export type ComponentColorType = TuniaoColorName | ''

export const useComponentColor = (
  prop: Ref<string | undefined>,
  type: ComponentColorType = ''
): [Ref<string>, Ref<string>, (val?: string) => void] => {
  const classColor = ref<string>('')
  const styleColor = ref<string>('')

  // 匹配图标内置颜色类正则表达式
  const innerColorReg = /^(tn-|gradient)/
  // 匹配样式style值正在表达式
  const styleColorReg =
    /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{8}|[A-Fa-f0-9]{3})$|^rgb\(\d{1,3}(,\s?\d{1,3}){2}\)$|^rgba\(\d{1,3}(,\s?\d{1,3}){2},\s?0?\.?\d{1,}\)|transparent/i

  // 处理传入的颜色值，判断是否为class或style
  const handleColorValue = (value?: string) => {
    classColor.value = ''
    styleColor.value = ''
    if (value === undefined) return
    if (innerColorReg.test(value)) {
      // 如果是背景颜色，则区分是否为渐变色
      if (type === 'bg' && /.*gradient.*/.test(value)) {
        // 根据__下划线分割数据
        const gradientValue = value.split('__')[1]
        classColor.value = `tn-gradient-bg__${gradientValue}`
        return
      }
      classColor.value = `${value}_${type}`
    }
    if (styleColorReg.test(value)) {
      styleColor.value = value
    }
  }
  handleColorValue(prop.value)

  watch(
    () => prop.value,
    (val) => {
      handleColorValue(val)
    }
  )

  // 更新颜色值和颜色类型
  const updateColor = (value?: string) => {
    handleColorValue(value)
  }

  return [classColor, styleColor, updateColor]
}
