import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import toast from "./components/common/toast";
import VueLazyload from "vue-lazyload";

Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()
//解决移动端300ms的延迟
FastClick.attach(document.body)
//安装toast
Vue.use(toast)
//图片懒加载
Vue.use(VueLazyload, {
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
