import Vue from 'vue'
import Router from 'vue-router'
import signin from './components/admin/signin.vue'
// import sidebar from './components/sidebar.vue'
import essay from './components/essay.vue'
import about from './components/about.vue'
import essayDetail from './components/essayDetail.vue'
import essayList from './components/admin/essayList.vue'
import essayEdit from './components/admin/essayEdit.vue'
import three from './views/three.vue'
import BG from './views/bg.vue'
import test from './views/testCanvas.vue'
import Lang from './views/lang.vue'
import TTT from './views/123.vue'


Vue.use(Router)

export default new Router({
  mode: 'hash',
  // base: process.env.BASE_URL,mat4
  routes: [

    {
      path: '/',
      name: 'essay',
      component: essay
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
    {
      path: '/essayDetail/:id',
      name: 'essayDetail',
      component: essayDetail
    },
    {
      path: '/admin/essayList',
      name: 'essayList',
      component: essayList
    },
    {
      path: '/admin/essayEdit',
      name: 'essayEdit',
      component: essayEdit
    },
    {
      path: '/admin/essayEdit/:id',
      name: 'essayEdit2',
      component: essayEdit
    },
    {
      path: '/admin/signin',
      name: 'signin',
      component: signin
    },
    {
      path: '/jumping',
      name: 'three',
      component: three
    },
    {
      path: '/bg',
      name: 'BG',
      component: BG
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/lang',
      name: 'lang',
      component: Lang
    },
    {
      path: '/123',
      name: '123',
      component: TTT
    },
  ]
})
