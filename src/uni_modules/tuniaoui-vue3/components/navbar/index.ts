import { withNoopInstall } from '../../utils'
import Navbar from './src/navbar.vue'

export const TnNavbar = withNoopInstall(Navbar)
export default TnNavbar

export * from './src/navbar'
export type { TnNavbarInstance } from './src/instance'
