import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Store from './store'
import Cookie from 'js-cookie'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// import * as Icons from "@element-plus/icons-vue";
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ECharts from 'vue-echarts' // 引入ECharts
import 'echarts' // 全局引入echarts
// import * as echarts from 'echarts'
const app = createApp(App)

// // 注册全局组件
// Object.keys(Icons).forEach((key) => {
//   app.component(key, Icons[key]);
// });

app.use(ElementPlus, {
  locale: zhCn
})
createApp(App)
  .use(Store)
  .use(router)
  .use(Cookie)
  .use(ElementPlus)
  .component('ECharts', ECharts)
  .mount('#app')
// app.config.globalProperties.$echarts = echarts
