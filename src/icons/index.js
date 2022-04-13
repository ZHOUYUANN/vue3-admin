// 先导入所有的 svg 图标，再全局注册 SvgIcon
import SvgIcon from '@/components/svg-icon'

const svgRequire = require.context('./svg', false, /\.svg$/)

svgRequire.keys().forEach((icon) => svgRequire(icon))

export default function (app) {
  app.component('svg-icon', SvgIcon)
}
