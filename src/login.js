import Vue from 'vue'
import './mock'

import Login from './Login.vue'

/* 导入公共样式 */
import './assets/reset.min.css';

/* 导入UI库中所有的组件和对应的样式 */
import ElementUI from 'element-ui';
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  render: h => h(Login)
}).$mount('#app')
