import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import VueNeo4j from 'vue-neo4j';
// import elTableInfiniteScroll from 'el-table-infinite-scroll';
import animated from 'animate.css';
// import echarts from 'echarts';
// Vue.use(echarts)
import * as echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.use(VueNeo4j);
Vue.use(animated);
Vue.use(ElementUI); 
Vue.use(Vuesax, {
  // options here
})
// Vue.use(elTableInfiniteScroll);
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
