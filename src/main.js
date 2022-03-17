// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import promise from 'es6-promise'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import './assets/icon/iconfont.css'
import './assets/styles/element-variables.scss'
// 项目css文件
import './assets/styles/index.scss'

// 注册全局filter
import * as filters from './assets/js/filters.js'
import Reg from './assets/js/reg.js'
import dict from './assets/js/dict.js'
Object.keys(filters).forEach(key => Vue.filter(key, filters[key]))
Vue.prototype.$reg = Reg
Vue.prototype.$dict = dict
promise.polyfill()
Vue.use(ElementUI, {
    size: 'small'
})

Vue.config.productionTip = false
/* 允许跨域 */
// axios.defaults.withCredentials = true

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
