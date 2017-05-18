import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import VueSocketio from 'vue-socket.io'

import App from './App'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(VueSocketio, 'http://193.70.37.135:506/');
Vue.config.debug = true

/* eslint-disable no-new */
new Vue({
  ...App
}).$mount('#app')
