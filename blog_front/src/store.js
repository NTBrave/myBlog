import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    checkLogin:false,
    isTooSmall: false

  },
  mutations: {
setCheckLogin(state,bo){
  state.checkLogin = bo;
},
setIsTooSmall(state,bo){
  state.isTooSmall = bo;

}
  },
  actions: {

  }
})
