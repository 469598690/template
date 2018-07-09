/**
 *
 */

//导入样式
import 'normalize.css'
import 'font-awesome/scss/font-awesome.scss'
import 'element-ui/lib/theme-chalk/index.css'
//导入Vue框架
import Vue from 'vue'
//导入element组件
import ElementUI from 'element-ui'
//导入组件
import router from './router'
//导入状态管理器
import store from 'store'
//导入请求框架
import api from './api'
//导入自定义插件
import Plugins from 'plugins'
//导入主视图文件
import App from './App'
//导入mock数据
import './mock'
// 导入拖拽事件
import VueDND from 'awe-dnd'
// 导入编辑器
import VueQuillEditor from 'vue-quill-editor'

//使用element-ui
Vue.use(ElementUI)

//使用编辑器
Vue.use(VueQuillEditor)

//使用自定义插件
Vue.use(Plugins)

//使用api
Vue.use(api)

// 使用拖拽事件
Vue.use(VueDND)

//发布后是否显示提示
Vue.config.productionTip = false

//是否开启工具调试
Vue.config.devtools = process.env.NODE_ENV === 'development'

new Vue({
  router,
  store,
  ...App
}).$mount('mainbody')
