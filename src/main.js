import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// 全局导入 svg 图标
import installIcon from '@/icons'

const app = createApp(App)
installIcon(app)

app.use(router).mount('#app')
