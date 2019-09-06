import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueResource from 'vue-resource'
Vue.config.productionTip = false


// Vue.use(VueRouter)
Vue.use(VueResource)

// 按需引用element
import { Button, Message, MessageBox, Notification, Popover, Tag, Input } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
const components = [Button, Message, MessageBox, Notification, Popover, Tag, Input]
import Antd from 'ant-design-vue'
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);

components.forEach((item) => {
  Vue.component(item.name, item)
})

const MsgBox = MessageBox
Vue.prototype.$msgbox = MsgBox
Vue.prototype.$alert = MsgBox.alert
Vue.prototype.$confirm = MsgBox.confirm
Vue.prototype.$prompt = MsgBox.prompt
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification


new Vue({
  el: '#app',
  router: router,
  store,
  render: h => h(App)
})
