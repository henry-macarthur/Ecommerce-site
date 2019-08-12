import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'

Vue.config.productionTip = false

let share = {
  token: ''
}

new Vue({
  router,
  store,
  publicData: {
    share
  },
  render: h => h(App)
}).$mount('#app')

