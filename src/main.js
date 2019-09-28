import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false

// 
// Add faunadb to the prototype.
//
// 1. faunadb
Vue.prototype.$faunadb = require('faunadb');
Vue.prototype.$q = Vue.prototype.$faunadb.query;
// server_key
Vue.prototype.$client = new Vue.prototype.$faunadb.Client({ secret: process.env.VUE_APP_FAUNADB_SECRET });
//Vue.prototype.$client = new Vue.prototype.$faunadb.Client({ secret: 'fnADY47y_RACEVrSDZcfA3TxW6r9vSArYlbWatoa' });

/* eslint-disable no-console */
console.log(process.env.VUE_APP_FAUNADB_SECRET);
/* eslint-enable no-console */


new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
