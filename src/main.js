import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import VueSession from 'vue-session'


Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(VueSession);

new Vue({
  render: h => h(App),
}).$mount('#app')
