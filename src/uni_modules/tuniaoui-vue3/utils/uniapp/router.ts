import { debugWarn } from '../error'
import { isEmptyVariableInDefault } from '../is-empty'

type navType = 'navigateTo' | 'redirectTo' | 'reLaunch' | 'switchTab'

/**
 * 返回上一页
 * @param indexUrl 首页地址
 * @param delta 返回的页面数，如果 delta 大于现有页面数，则返回到首页
 */
export function tnNavBack(indexUrl?: string, delta = 1) {
  const indexPageUrl = isEmptyVariableInDefault(indexUrl, '/pages/index/index')
  // 通过判断当前页面的页面栈信息，是否有上一页进行返回，如果没有则跳转到首页
  const pages = getCurrentPages()
  if (pages?.length) {
    const firstPage = pages[0]
    if (
      pages.length === 1 &&
      (!firstPage.route || firstPage?.route != indexPageUrl)
    ) {
      return tnNavPage(indexPageUrl, 'reLaunch')
    } else {
      uni.navigateBack({
        delta,
      })
      return Promise.resolve()
    }
  } else {
    return tnNavPage(indexPageUrl, 'reLaunch')
  }
}

/**
 * 跳转到指定页面
 * @param url 页面地址
 * @param type 跳转类型
 */
export function tnNavPage(url: string, type: navType = 'navigateTo') {
  function handelNavFail(err: any) {
    debugWarn('tnNavPage', `跳转页面失败: ${err}`)
  }
  return new Promise<void>((resolve, reject) => {
    switch (type) {
      case 'navigateTo':
        uni.navigateTo({
          url,
          success: () => {
            resolve()
          },
          fail: (err) => {
            handelNavFail(err)
            reject(err)
          },
        })
        break
      case 'redirectTo':
        uni.redirectTo({
          url,
          success: () => {
            resolve()
          },
          fail: (err) => {
            handelNavFail(err)
            reject(err)
          },
        })
        break
      case 'reLaunch':
        uni.reLaunch({
          url,
          success: () => {
            resolve()
          },
          fail: (err) => {
            handelNavFail(err)
            reject(err)
          },
        })
        break
      case 'switchTab':
        uni.switchTab({
          url,
          success: () => {
            resolve()
          },
          fail: (err) => {
            handelNavFail(err)
            reject(err)
          },
        })
    }
  })
}
