import Vue from 'vue'
import { BootstrapVue, IconsPlugin, BIcon, BIconArrowUp, BIconArrowDown, BootstrapVueIcons } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-vue/src/icons.scss'
import 'bootstrap-vue/dist/bootstrap-vue-icons.min.css'

Vue.config.productionTip = false
// Install BootstrapVue
Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
Vue.component('BIcon', BIcon)
Vue.component('BIconArrowUp', BIconArrowUp)
Vue.component('BIconArrowDown', BIconArrowDown)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
