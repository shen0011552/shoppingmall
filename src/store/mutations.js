import {
  ADD_COUNTER,
  PUSH_CART
} from "./mutation-type";

export default {
  [ADD_COUNTER](state, payload) {
    payload.count += 1
  },
  [PUSH_CART](state, payload) {
    payload.check = true
    state.cartList.push(payload)
  }
}



/*{
  /!*!// addCart(state, payload) {
    // console.log(state.cartList)
    //payload新添加的商品
    //用iid判断cartLisrt和新添加是否重复
    //for循环
    /!*let oldProduct = null
    for(let i in state.cartList) {
      if (i.iid === payload.iid) {
        oldProduct = i
      }
    }
    //2.判断oldProduct
    if (oldProduct) {
      oldProduct.count += 1
    }else{
      payload.count = 1
      state.cartList.push(payload)
    }*!/
    //使用find(查找)函数
    //1.查找之前数组中是否有该商品
    /!*let product = state.cartList.find(item => item.iid === payload.iid)
    if (product) {
      product.count += 1
    }else {
      payload.count = 1
      state.cartList.push(payload)
    }
  }*!/
  // },*!/
  [ADD_COUNTER](state, payload) {
    payload.count += 1
  },
  [PUSH_CART](state, payload) {
    state.cartList.push(payload)
  }
}*/
