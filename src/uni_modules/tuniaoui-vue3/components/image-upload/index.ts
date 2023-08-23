import { withNoopInstall } from '../../utils'
import ImageUpload from './src/image-upload.vue'

export const TnImageUpload = withNoopInstall(ImageUpload)
export default TnImageUpload

export * from './src/image-upload'
export * from './src/types'
export type { TnImageUploadInstance } from './src/instance'
