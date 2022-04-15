import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'element-plus/theme-chalk/index.css'

// 引入路由守卫
import './permission'

// 全局样式文件
import '@/assets/stylus/index.styl'

// 全局导入 svg 图标
import installIcon from '@/icons'

const app = createApp(App)
installIcon(app)

app.use(store).use(router).mount('#app')
