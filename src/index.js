import Vue from 'vue' //引入vue
import App from './app.vue'

import './assets/styles/global.styl'
// import './assets/styles/style.styl'
// import './assets/images/pro_01.png'

const root = document.createElement('div')
document.body.appendChild(root)

//挂载app
new Vue({
  render: (h) => h(App)
}).$mount(root);