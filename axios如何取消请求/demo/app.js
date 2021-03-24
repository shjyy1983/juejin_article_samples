import Vue from 'vue'
import App from './App.vue'
import router from './src/router'

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
