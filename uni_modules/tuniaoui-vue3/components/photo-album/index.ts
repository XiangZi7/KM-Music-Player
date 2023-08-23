import { withNoopInstall } from '../../utils'
import PhotoAlbum from './src/photo-album.vue'

export const TnPhotoAlbum = withNoopInstall(PhotoAlbum)
export default TnPhotoAlbum

export * from './src/photo-album'
export type { TnPhotoAlbumInstance } from './src/instance'
