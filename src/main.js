import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import Vue from 'vue'
import VeeValidate from 'vee-validate'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

Vue.use(VeeValidate, {
  validity: true,
  locale: 'en',
  events: ''
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
