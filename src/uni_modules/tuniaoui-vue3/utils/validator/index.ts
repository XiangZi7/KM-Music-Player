/**
 * 验证电子邮箱格式
 */
export const isEmail = (value: string): boolean => {
  return /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(
    value
  )
}

/**
 * 验证手机格式
 */
export const isMobile = (value: string): boolean => {
  return /^1[3-9]\d{9}$/.test(value)
}

/**
 * 验证URL格式
 */
export const isUrl = (value: string): boolean => {
  return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/.test(value)
}

/**
 * 验证日期格式
 */
export const isDate = (value: string): boolean => {
  return !/Invalid|NaN/.test(new Date(value).toString())
}

/**
 * 验证ISO类型的日期格式
 */
export const isDateISO = (value: string): boolean => {
  return /^\d{4}[/-](0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])$/.test(value)
}

/**
 * 验证十进制数字
 */
export const isNumber = (value: string): boolean => {
  // eslint-disable-next-line no-useless-escape
  return /^[\+-]?(\d+\.?\d*|\.\d+|\d\.\d+e\+\d+)$/.test(value)
}

/**
 * 验证整数
 */
export const isDigits = (value: string): boolean => {
  return /^\d+$/.test(value)
}

/**
 * 验证身份证号码
 */
export const isIdCard = (value: string): boolean => {
  return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
    value
  )
}

/**
 * 是否车牌号
 */
export const isCarNo = (value: string): boolean => {
  // 新能源车牌
  const xreg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/
  // 旧车牌
  const creg =
    /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/
  if (value.length === 7) {
    return creg.test(value)
  } else if (value.length === 8) {
    return xreg.test(value)
  } else {
    return false
  }
}

/**
 * 金额,只允许2位小数
 */
export const isAmount = (value: string): boolean => {
  //金额，只允许保留两位小数
  return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value)
}

/**
 * 中文
 */
export const isChinese = (value: string): boolean => {
  // eslint-disable-next-line unicorn/escape-case
  const reg = /^[\u4e00-\u9fa5]+$/gi
  return reg.test(value)
}

/**
 * 只能输入字母
 */
export const isLetter = (value: string): boolean => {
  return /^[a-zA-Z]*$/.test(value)
}

/**
 * 只能是字母或者数字
 */
export const isEnOrNum = (value: string): boolean => {
  //英文或者数字
  const reg = /^[0-9a-zA-Z]*$/g
  return reg.test(value)
}

/**
 * 验证是否包含某个值
 */
export const isContains = (value: string, param: string): boolean => {
  return value.includes(param)
}

/**
 * 验证一个值范围[min, max]
 */
export const isRange = (
  value: string | number,
  param: (string | number)[]
): boolean => {
  return value >= param[0] && value <= param[1]
}

/**
 * 验证一个长度范围[min, max]
 */
export const isRangeLength = (
  value: string,
  param: (string | number)[]
): boolean => {
  return value.length >= Number(param[0]) && value.length <= Number(param[1])
}

/**
 * 是否固定电话
 */
export const isLandline = (value: string): boolean => {
  const reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/
  return reg.test(value)
}

/**
 * 判断是否为空
 */
export const isEmpty = (value: any): boolean => {
  switch (typeof value) {
    case 'undefined':
      return true
    case 'string':
      if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, '').length == 0)
        return true
      break
    case 'boolean':
      if (!value) return true
      break
    case 'number':
      if (0 === value || Number.isNaN(value)) return true
      break
    case 'object':
      if (null === value) return true
      if (Object.keys(value).length === 0) return true
      return false
  }
  return false
}

/**
 * 是否json字符串
 */
export const isJsonString = (value: string): boolean => {
  if (typeof value == 'string') {
    try {
      const obj = JSON.parse(value)
      if (typeof obj == 'object' && obj) {
        return true
      } else {
        return false
      }
      // eslint-disable-next-line unicorn/prefer-optional-catch-binding
    } catch (e) {
      return false
    }
  }
  return false
}

/**
 * 是否短信验证码
 */
export const isMessageCode = (value: string, len = 6): boolean => {
  return new RegExp(`^\\d{${len}}$`).test(value)
}
