import { withNoopInstall } from '../../utils'
import Slider from './src/slider.vue'

export const TnSlider = withNoopInstall(Slider)
export default TnSlider

export * from './src/slider'
export type { TnSliderInstance } from './src/instance'
