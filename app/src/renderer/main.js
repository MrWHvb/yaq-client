import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import VueRouter from 'vue-router'
import VueSocketio from 'vue-socket.io'

import App from './App'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(VueRouter)
Vue.use(VueSocketio, 'http://193.70.37.135:506/');
Vue.config.debug = true;

const router = new VueRouter({
	routes: require('./routes.js')
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
