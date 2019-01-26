import './style.css';
import '../assets/favicon.ico';
import 'vuetify/dist/vuetify.min.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import Vue from 'vue';
import App from './App.vue';
import store from './store'

import VueResource from 'vue-resource';
import VueTimers from 'vue-timers';
import Vuetify from 'vuetify'

Vue.use(VueResource);
Vue.use(VueTimers);
Vue.use(Vuetify);

var app = new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
