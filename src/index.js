import './style.css';
import '../assets/favicon.ico';
//import 'vuetify/dist/vuetify.min.css';
// a la carte support
import 'vuetify/src/stylus/app.styl';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import colors from 'vuetify/es5/util/colors';


import Vue from 'vue';
import App from './App.vue';
import store from './store'

import VueResource from 'vue-resource';
import VueTimers from 'vue-timers';
//import Vuetify from 'vuetify';
// a la carte support
import Vuetify from 'vuetify/lib';

Vue.use(VueResource);
Vue.use(VueTimers);
Vue.use(Vuetify, {
  theme: {
    primary: colors.orange.darken1,
    secondary: colors.orange.lighten5,
    accent: colors.deepPurple.base
  }
});

var app = new Vue({
  el: '#app',
  store,
  render: h => h(App),
    mounted () {
    document.dispatchEvent(new Event('render-event'));
  }
});
