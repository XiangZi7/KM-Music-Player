import { computed, getCurrentInstance, nextTick, ref, watch } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../../../../constants'
import { debugWarn, isBoolean, isPromise, throwError } from '../../../../utils'
import { useFormItem } from '../../../form'
import useUploadHandleFunction from './use-upload-handle-function'

import type { ImageUploadList, ImageUploadListItem } from '../types'
import type { ImageUploadProps } from '../image-upload'

export const useImageUpload = (props: ImageUploadProps) => {
  const { emit } = getCurrentInstance()!
  const {
    chooseImage,
    uploadProcess,
    checkFileSizeAndExtension,
    showErrorTips,
  } = useUploadHandleFunction(props)

  const { formItem } = useFormItem()

  // 文件列表
  const fileList = ref<ImageUploadList>([])

  // 监听文件列表变化
  let isInnerUpdate = false
  watch(
    () => props.modelValue,
    (val) => {
      if (isInnerUpdate) {
        isInnerUpdate = false
        return
      }

      fileList.value = val.map((item) => ({
        url: item,
        status: 'done',
        progress: 100,
      }))
    },
    {
      immediate: true,
    }
  )

  // 判断是否超过最大上传数
  const isExceedMaxCount = computed<boolean>(
    () => fileList.value.length >= props.limit
  )
  // 当前剩余可选文件数量
  const currentRemainFileCount = computed<number>(() => {
    if (props.multiple) {
      return props.limit - fileList.value.length
    } else {
      return props.limit - fileList.value.length > 0 ? 1 : 0
    }
  })

  // 选择文件
  const chooseFile = () => {
    const { disabled, action, customUploadHandler } = props
    if (disabled) return

    // 如果没有设置action或者没有自定义图片上传处理函数，则直接返回
    if (!action && !customUploadHandler) {
      showErrorTips('请设置action或者自定义图片上传处理函数')
      debugWarn('TnImageUpload', '请设置action或者自定义图片上传处理函数')
      return
    }
    // 选择前已有文件的数量
    const prevUploadedFileCount = fileList.value.length
    chooseImage(currentRemainFileCount.value)
      .then((res) => {
        let selectFile = res
        // 判断尺寸和格式是否正确
        const checkFailFiles = checkFileSizeAndExtension(selectFile)
        if (checkFailFiles.length) {
          showErrorTips('文件格式或大小不符合要求')
          emit('oversizeOrNoSupport', checkFailFiles)
          // 剔除不符合要求的文件
          selectFile = selectFile.filter(
            (item) => !checkFailFiles.includes(item)
          )
        }
        fileList.value.push(
          ...selectFile.map<ImageUploadListItem>((item) => {
            const url = (item as UniApp.ChooseImageSuccessCallbackResultFile)
              .path
            return {
              url,
              status: 'ready',
              progress: 0,
              file: item,
            }
          })
        )
        if (props.autoUpload && selectFile.length)
          uploadFile(prevUploadedFileCount)
      })
      .catch((err) => {
        debugWarn('TnImageUpload', `选择图片失败: ${err}`)
        showErrorTips(err?.errMsg || '选择图片失败')
      })
  }

  // 处理上传事件
  const handleUploadEvent = (
    item: ImageUploadListItem,
    index: number,
    uploadSingle = false
  ) => {
    uploadProcess(item)
      .then((res) => {
        if (res) {
          handleUploadSuccess(item)
        } else {
          handleUploadError(item, '上传失败')
        }
      })
      .catch((err) => {
        handleUploadError(item, err)
      })
      .finally(() => {
        if (!uploadSingle) uploadFile(index + 1)
      })
  }

  // 上传文件
  const uploadFile = (startIndex: number, uploadSingle = false) => {
    const { autoUpload, beforeUpload } = props
    const autoNextUpload = autoUpload && !uploadSingle
    // 判断是否全部文件上传完毕
    if (startIndex >= fileList.value.length) {
      if (props.autoRemoveFaildFile) handleUploadCompleteFailFile()
      return
    }

    const fileItem = fileList.value[startIndex]

    // 如果当前上传完毕自动上传下一张
    if (fileItem.progress === 100) {
      fileItem.status = 'done'
      fileItem.uploadTask = undefined
      if (autoNextUpload) uploadFile(startIndex + 1)
      return
    }

    // 上传前回调
    if (!beforeUpload) {
      handleUploadEvent(fileItem, startIndex, uploadSingle)
      return
    }

    const shouldUpload = beforeUpload(fileItem.file!)
    const isBeforeUploadPromiseOrBoolean = [
      isPromise(shouldUpload),
      isBoolean(shouldUpload),
    ].includes(true)
    if (!isBeforeUploadPromiseOrBoolean) {
      throwError(
        '[TnImageUpload]',
        'beforeUpload返回值必须是Promise或者Boolean'
      )
    }

    if (isPromise(shouldUpload)) {
      shouldUpload
        .then((res) => {
          if (res) handleUploadEvent(fileItem, startIndex, uploadSingle)
          else {
            removeFile(startIndex)
            if (autoNextUpload) uploadFile(startIndex)
          }
        })
        .catch((err) => {
          debugWarn('TnImageUpload', `beforeUpload出错: ${err}`)
          fileItem.status = 'failed'
        })
    } else {
      if (shouldUpload) handleUploadEvent(fileItem, startIndex, uploadSingle)
      else {
        removeFile(startIndex)
        if (autoNextUpload) uploadFile(startIndex)
      }
    }
  }

  // 获取上传成功的文件url
  const getUploadSuceesFileUrlValue = () => {
    return fileList.value
      .filter((item) => item.status === 'done')
      .map((item) => item.url)
  }

  // 已上传文件列表发生改变
  const uploadSuccessFileListChange = () => {
    isInnerUpdate = true
    const value = getUploadSuceesFileUrlValue()
    emit(UPDATE_MODEL_EVENT, value)
    nextTick(() => {
      emit(CHANGE_EVENT, value)
      if (props.validateEvent) {
        formItem?.validate?.('change').catch((err) => {
          debugWarn(err)
        })
      }
    })
  }

  // 处理文件上传成功
  const handleUploadSuccess = (item: ImageUploadListItem) => {
    item.status = 'done'
    item.progress = 100
    item.uploadTask = undefined
    item.file = undefined
    emit('success', item)
    uploadSuccessFileListChange()
  }

  // 处理上传文件发生错误
  const handleUploadError = (item: ImageUploadListItem, errorMsg: string) => {
    item.status = 'failed'
    item.progress = 0
    item.uploadTask = undefined
    item.file = undefined
    showErrorTips(errorMsg)
    emit('fail', new Error(errorMsg), item)
  }

  // 处理上传完成后失败的文件
  const handleUploadCompleteFailFile = () => {
    const tempFileList = [...fileList.value]
    tempFileList.forEach((item, index) => {
      if (item.status === 'failed') {
        removeFile(index)
      }
    })
  }

  // 重新上传文件
  const retryUploadFile = (index: number) => {
    const fileItem = fileList.value[index]
    fileItem.status = 'ready'
    fileItem.progress = 0
    uploadFile(index, true)
  }

  // 重新上传全部文件
  const retryAllUpload = () => {
    // 查找出第一张上传失败的图片
    const firstFailedFileIndex = fileList.value.findIndex(
      (item) => item.status === 'failed'
    )
    uploadFile(firstFailedFileIndex)
  }

  // 移除文件
  const removeFile = (index: number) => {
    const fileItem = fileList.value[index]

    // 如果文件正在上传中，取消上传
    if (
      fileItem.status === 'uploading' &&
      fileItem.uploadTask &&
      fileItem.progress > 0 &&
      fileItem.progress < 100
    ) {
      fileItem.uploadTask.abort()
    }

    fileList.value.splice(index, 1)

    // 如果文件是已经完成的，重新计算上传成功的文件url
    if (fileItem.status === 'done') {
      emit('remove', fileItem.url)
      uploadSuccessFileListChange()
    }
  }

  // 删除文件
  const removeFileEvent = (index: number) => {
    const { disabled, beforeRemove } = props
    if (disabled) return
    // 获取待删除的文件
    const fileItem = fileList.value[index]
    if (!fileItem) return

    uni.showModal({
      title: '操作提示',
      content: '确认需要移除该图片吗?',
      showCancel: true,
      cancelText: '取 消',
      confirmText: '确 认',
      success: (res) => {
        if (res.confirm) {
          // 删除前回调
          if (!beforeRemove) {
            removeFile(index)
            return
          }

          const shouldRemove = beforeRemove(fileItem)
          const isShouldRemovePromiseOrBoolean = [
            isPromise(shouldRemove),
            isBoolean(shouldRemove),
          ].includes(true)
          if (!isShouldRemovePromiseOrBoolean) {
            throwError(
              '[TnImageUpload]',
              'beforeRemove返回值必须是Promise或者Boolean'
            )
          }

          if (isPromise(shouldRemove)) {
            shouldRemove
              .then((res) => {
                if (res) removeFile(index)
              })
              .catch((err) => {
                debugWarn('TnImageUpload', `beforeRemove出错: ${err}`)
              })
          } else {
            if (shouldRemove) removeFile(index)
          }
        }
      },
    })
  }

  // 清空文件列表
  const clearAllFile = () => {
    // 如果文件正在上传中，取消上传
    fileList.value.forEach((item) => {
      if (
        item.status === 'uploading' &&
        item.uploadTask &&
        item.progress > 0 &&
        item.progress < 100
      ) {
        item.uploadTask.abort()
      }
    })
    fileList.value = []
    uploadSuccessFileListChange()
  }

  // 点击图片预览图片
  const previewImage = (index: number) => {
    const previewImageList = fileList.value
      .filter((item) => item.status === 'done')
      .map((item) => item.url)

    uni.previewImage({
      current: index,
      urls: previewImageList,
    })

    emit('preview', previewImageList[index])
  }

  return {
    fileList,
    isExceedMaxCount,
    chooseFile,
    retryUploadFile,
    retryAllUpload,
    removeFileEvent,
    clearAllFile,
    previewImage,
  }
}
