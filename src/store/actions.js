import {
  ADD_COUNTER,
  PUSH_CART
} from "./mutation-type";


export default {
  addCart(context, payload){
    return new Promise((resolve, reject) => {
      let product = context.state.cartList.find(item => item.iid === payload.iid)
      if (product) {
        context.commit(ADD_COUNTER, product)
        resolve('商品数量+1')
      } else {
        payload.count = 1
        context.commit(PUSH_CART, payload)
        resolve('添加商品到购物车')
      }
    })
  }
}
/*{
  addCart(context, payload) {
    let product = context.state.cartList.find(item => item.iid === payload.iid)
    if (product) {
      // product.count += 1
      context.commit(ADD_COUNTER, product)
    }else {
      /!*payload.count = 1
      state.cartList.push(payload)*!/
      payload.count = 1
      context.commit(PUSH_CART, payload)
    }
  }
}*/
