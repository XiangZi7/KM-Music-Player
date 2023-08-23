export type ImageUploadList = Array<ImageUploadListItem>
export interface ImageUploadListItem {
  url: string
  status: 'ready' | 'uploading' | 'done' | 'failed'
  progress: number
  uploadTask?: UniApp.UploadTask
  file?: ImageUploadFile
}

export type ImageUploadFile = UniApp.ChooseImageSuccessCallbackResultFile | File
