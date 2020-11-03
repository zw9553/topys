import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './assets/font/iconfont.css'
import './assets/css/reset.css'
import axios from 'axios'

Vue.config.productionTip = false
Vue.prototype.axios=axios

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')                       
