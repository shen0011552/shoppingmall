import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)

import mutations from './mutations'
import actions from './actions'
import getters from "./getters";
import {ADD_COUNTER, PUSH_CART} from "./mutation-type";

const state = {
  cartList: []
}

const store = new Vuex.Store({
  state,
  //mutations 唯一的目的就是修改state中的状态
  //mutations 中的每个方法尽可能完成的事情比较单一一点
  mutations,
  actions,    /*除了放异步操作, 还放一些复杂的代码: 比如判断*/
  getters
})

export default store
