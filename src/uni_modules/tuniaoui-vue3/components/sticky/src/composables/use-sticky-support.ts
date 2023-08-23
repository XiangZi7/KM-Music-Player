import { getCurrentInstance, ref } from 'vue'
import { debugWarn } from '../../../..//utils'

export const useStickySupport = () => {
  const supportCSSSticky = ref<boolean | null>(null)

  const instance = getCurrentInstance()
  if (!instance) {
    debugWarn('TnSticky', '请在 setup 中使用 useStickySupport')
  }

  // H5通过创建元素的方法嗅探是否支持 CSS Sticky
  const checkCSSStickySupportForH5 = () => {
    // #ifdef H5
    const vendorList = ['', '-webkit-', '-ms-', '-moz-', '-o-'],
      vendorListLength = vendorList.length,
      stickyElement = document.createElement('div')

    for (let i = 0; i < vendorListLength; i++) {
      stickyElement.style.position = `${vendorList[i]}sticky`
      if (stickyElement.style.position !== '') {
        supportCSSSticky.value = true
        return
      }
    }

    supportCSSSticky.value = false
    // #endif
  }

  // 在APP和微信小程序上，通过uni.createSelectorQuery嗅探是否支持 CSS Sticky
  const checkCSSStickySupportForAPPAndMPWX = (selector: string) => {
    // #ifdef APP-VUE || MP-WEIXIN
    uni
      .createSelectorQuery()
      .in(instance)
      .select(selector)
      .fields(
        {
          computedStyle: ['position'],
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        () => {}
      )
      .exec((res) => {
        if ('sticky' === res[0].position) {
          supportCSSSticky.value = true
        } else {
          supportCSSSticky.value = false
        }
      })
    // #endif
  }

  // 根据机型检测是否支持 CSS Sticky
  const checkCSSStickySupportForDevice = () => {
    // 获取手机对应的系统\操作系统名称和版本
    const { platform, system } = uni.getSystemInfoSync()
    const os = platform.toLowerCase()
    const osVersion = system
    if (
      (os === 'android' && Number(osVersion.replace('Android', '')) > 8) ||
      os === 'ios'
    ) {
      supportCSSSticky.value = true
    } else {
      supportCSSSticky.value = false
    }
  }

  // 检测当前环境是否支持 CSS Sticky
  const checkCSSStickySupport = async (selector: string) => {
    // 检测H5是否支持 CSS Sticky，主流浏览器都支持
    // #ifdef H5
    checkCSSStickySupportForH5()
    // #endif

    // 通过机型去判断是否支持 CSS Sticky
    if (!supportCSSSticky.value) {
      checkCSSStickySupportForDevice()
    }

    // 通过节点去判断是否支持 CSS Sticky
    if (!supportCSSSticky.value) {
      // #ifdef APP-VUE || MP-WEIXIN
      checkCSSStickySupportForAPPAndMPWX(selector)
      // #endif
    }

    // #ifdef APP-NVUE
    // nvue默认时支持的
    supportCSSSticky.value = true
    // #endif
  }

  return {
    supportCSSSticky,
    checkCSSStickySupport,
  }
}
