import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'

// import echarts from 'echarts'

import * as echarts from 'echarts';
// 按需引入
// import * as echarts from 'echarts/lib/echarts';


Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
