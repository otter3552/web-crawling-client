import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import LineChart from './components/charts/LineChart.vue'

Vue.config.productionTip = false
Vue.component('line-chart',LineChart)

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
