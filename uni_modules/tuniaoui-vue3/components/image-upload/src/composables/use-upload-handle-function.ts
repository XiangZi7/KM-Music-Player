import { ref, watch } from 'vue'
import {
  isArray,
  isEmptyVariableInDefault,
  isPromise,
  isString,
} from '../../../../utils'
import { isJsonString } from '../../../../utils/validator'

import type { ImageUploadFile, ImageUploadListItem } from '../types'
import type { ImageUploadProps } from '../image-upload'

export default function useUploadHandleFunction(props: ImageUploadProps) {
  // 选择系统图片
  const chooseImage = (count: number) => {
    return new Promise<Array<ImageUploadFile>>((resolve, reject) => {
      uni.chooseImage({
        count,
        sizeType: props.sizeType,
        // extension: props.extensions,
        sourceType: props.sourceType,
        success: (res) => {
          resolve(isArray(res.tempFiles) ? res.tempFiles : [res.tempFiles])
        },
        fail: (err) => {
          reject(err)
        },
      })
    })
  }

  // 上传图片事件，调用接口
  // 正在上传标识
  const uploading = ref(false)
  watch(
    () => uploading.value,
    (val) => {
      if (val) uni.showLoading({ title: '上传中' })
      else uni.hideLoading()
    }
  )
  const uploadProcess = (item: ImageUploadListItem): Promise<boolean> => {
    const { customUploadHandler, customUploadCallback } = props
    if (uploading.value) return Promise.reject('有文件正在上传')

    return new Promise((resolve, reject) => {
      // 如果有自定义上传处理函数，则调用自定义上传处理函数
      if (customUploadHandler) {
        const uploadHandlerResult = customUploadHandler(item.file!)
        const isUploadHandlePromiseOrString = [
          isPromise(uploadHandlerResult),
          isString(uploadHandlerResult),
        ].includes(true)
        if (!isUploadHandlePromiseOrString) {
          console.error(
            '[TnImageUpload]自定义上传处理函数必须返回Promise和String'
          )
          reject('自定义上传处理函数必须返回Promise和String')
          return
        }
        uploading.value = true
        item.status = 'uploading'

        if (isPromise(uploadHandlerResult)) {
          uploadHandlerResult
            .then((res) => {
              if (res) {
                item.url = res
                resolve(true)
              } else {
                resolve(false)
              }
            })
            .catch((err) => {
              console.error('[TnImageUpload]上传文件发生错误', err)
              reject(err?.errMsg || '上传文件发生错误')
            })
            .finally(() => {
              uploading.value = false
            })
        } else {
          if (uploadHandlerResult) {
            item.url = uploadHandlerResult
            resolve(true)
          } else {
            resolve(false)
          }
          uploading.value = false
        }
      } else {
        // 内部集成图片上传
        uploading.value = true
        item.status = 'uploading'

        // 创建上传对象
        const task = uni.uploadFile({
          url: props.action!,
          filePath: item.url,
          name: props.name,
          formData: props.formData,
          header: props.header,
          success: (res: UniApp.UploadFileSuccessCallbackResult) => {
            // 判断用户是否自己处理上传后服务器回传的结果
            if (customUploadCallback) {
              const customUploadCallbackResult = customUploadCallback(res)
              const isCustomUploadCallbackPromiseOrString = [
                isPromise(customUploadCallbackResult),
                isString(customUploadCallbackResult),
              ].includes(true)
              if (!isCustomUploadCallbackPromiseOrString) {
                console.error(
                  '[TnImageUpload]自定义上传回调函数必须返回Promise和String'
                )
                reject('自定义上传回调函数必须返回Promise和String')
                return
              }

              if (isPromise(customUploadCallbackResult)) {
                customUploadCallbackResult
                  .then((res) => {
                    if (res) {
                      item.url = res
                      resolve(true)
                    } else {
                      resolve(false)
                    }
                  })
                  .catch((err) => {
                    console.error('[TnImageUpload]上传文件发生错误', err)
                    reject(err?.errMsg || '上传文件发生错误')
                  })
              } else {
                if (customUploadCallbackResult) {
                  item.url = customUploadCallbackResult
                  resolve(true)
                } else {
                  resolve(false)
                }
              }
            } else {
              // 使用集成的上传回调函数
              const { statusCode, data: resData } = res
              if (![200, 201, 204].includes(statusCode)) {
                console.error('[TnImageUpload]上传文件发生错误', res)
                reject(res?.errMsg || '上传文件发生错误')
                return
              } else {
                const data = isJsonString(resData)
                  ? JSON.parse(resData)
                  : resData
                // 默认返回的格式为 { code: 200, data: { errorCode: 0,  url: '' } }
                if (data.code === 200 && data.data.errCode === 0) {
                  item.url = data.data.url
                  resolve(true)
                } else {
                  console.error('[TnImageUpload]上传文件发生错误', res)
                  reject(
                    isEmptyVariableInDefault(
                      data?.message,
                      data?.msg || '上传文件发生错误'
                    )
                  )
                }
              }
            }
          },
          fail: (err) => {
            console.error('[TnImageUpload]上传文件发生错误', err)
            reject(err?.errMsg || '上传文件发生错误')
          },
          complete: () => {
            uploading.value = false
            resolve(true)
          },
        })

        item.uploadTask = task
        // 监听上传进度
        task.onProgressUpdate((res) => {
          if (res.progress > 0) {
            item.progress = res.progress
          }
        })
      }
    })
  }

  // 检查文件是否超过最大文件尺寸或者不符合上传文件类型
  const checkFileSizeAndExtension = (files: Array<ImageUploadFile>) => {
    const { extensions, maxSize } = props
    // #ifdef MP-ALIPAY
    extensions.push('image')
    // #endif
    const extReg = /.+\./
    return files.filter((item) => {
      // 获取文件后缀名
      let fileExt = ''
      // #ifdef H5
      fileExt = (item as File).name.replace(extReg, '').toLowerCase()
      // #endif
      // #ifndef H5
      fileExt = (item as UniApp.ChooseImageSuccessCallbackResultFile).path
        .replace(extReg, '')
        .toLowerCase()
      // #endif
      return (
        !extensions.some((ext) => ext.toLowerCase() === fileExt) ||
        item.size > maxSize
      )
    })
  }

  // 是否显示错误提示
  const showErrorTips = (msg: string) => {
    if (!props.showErrorTips) return
    uni.showToast({
      icon: 'none',
      title: msg,
    })
  }

  return {
    chooseImage,
    uploadProcess,
    checkFileSizeAndExtension,
    showErrorTips,
  }
}
