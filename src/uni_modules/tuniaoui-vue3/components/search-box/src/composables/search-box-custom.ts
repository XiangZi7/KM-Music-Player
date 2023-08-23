import { computed, toRef } from 'vue'
import { useComponentColor, useNamespace } from '../../../../hooks'

import type { CSSProperties } from 'vue'
import type { SearchBoxProps } from '../search-box'

export const useSearchBoxCustomStyle = (props: SearchBoxProps) => {
  const ns = useNamespace('search-box')

  // 解析颜色
  const [textColorClass, textColorStyle] = useComponentColor(
    toRef(props, 'textColor'),
    'text'
  )
  const [borderColorClass, borderColorStyle] = useComponentColor(
    toRef(props, 'borderColor'),
    'border'
  )
  const [placeholderColorClass, placeholderColorStyle] = useComponentColor(
    toRef(props, 'placeholderColor'),
    'text'
  )
  const [searchButtonTextColorClass, searchButtonTextColorStyle] =
    useComponentColor(toRef(props, 'searchButtonTextColor'), 'text')
  const [searchButtonBgColorClass, searchButtonBgColorStyle] =
    useComponentColor(toRef(props, 'searchButtonBgColor'), 'bg')

  // 搜索框的类
  const searchBoxClass = computed<string>(() => {
    const cls: string[] = [
      ns.b(),
      ns.m(props.shape),
      ns.is('no-search-btn', !props.searchButton),
      ns.is('disabled', props.disabled),
    ]

    if (props.border) {
      cls.push(ns.m('border'))
      if (borderColorClass.value) cls.push(borderColorClass.value)
    }
    if (props.size) cls.push(ns.m(props.size))

    if (textColorClass.value) cls.push(textColorClass.value)

    return cls.join(' ')
  })
  // 搜索框的样式
  const searchBoxStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (!textColorClass.value)
      style.color = textColorStyle.value || 'var(--tn-text-color-primary)'

    if (props.border) {
      if (!borderColorClass.value) {
        style.borderColor = borderColorStyle.value || 'var(--tn-color-gray)'
      }
    }

    return style
  })

  // 搜索框占位文字的类
  const placeholderClass = computed<string>(() => {
    const cls: string[] = [
      ns.e('placeholder'),
      ns.em('placeholder', props.textAlign),
    ]

    if (placeholderColorClass.value) cls.push(placeholderColorClass.value)

    return cls.join(' ')
  })
  // 搜索框占位文字的样式
  const placeholderStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (!placeholderColorClass.value)
      style.color =
        placeholderColorStyle.value || 'var(--tn-text-color-secondary)'

    return style
  })

  // 搜索按钮的类
  const searchButtonClass = computed<string>(() => {
    const cls: string[] = [ns.e('search-button')]

    if (searchButtonBgColorClass.value) cls.push(searchButtonBgColorClass.value)
    if (searchButtonTextColorClass.value)
      cls.push(searchButtonTextColorClass.value)

    return cls.join(' ')
  })
  // 搜索按钮的样式
  const searchButtonStyle = computed<CSSProperties>(() => {
    const style: CSSProperties = {}

    if (!searchButtonBgColorClass.value)
      style.backgroundColor =
        searchButtonBgColorStyle.value || 'var(--tn-color-primary)'

    if (searchButtonTextColorStyle.value) {
      style.color = searchButtonTextColorStyle.value
    } else if (
      !searchButtonBgColorClass.value &&
      !searchButtonTextColorClass.value
    ) {
      style.color = 'var(--tn-color-white)'
    }

    return style
  })

  return {
    ns,
    searchBoxClass,
    searchBoxStyle,
    placeholderClass,
    placeholderStyle,
    searchButtonClass,
    searchButtonStyle,
  }
}
