import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import Vuelidate from 'vuelidate'
import './assets/tailwind.css'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.component('Search', require('./components/Search').default)
Vue.component('InputSearch', require('./components/InputSearch').default)
Vue.component('SearchDetails', require('./components/SearchDetails').default)
Vue.component('Counter', require('./components/Counter').default)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
