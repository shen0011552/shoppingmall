<template>
  <div class="cart-botton">
    <div class="check-content">
      <check-bottom :is-check="isSelectAll" class="checked" @click.native="checkClick"/>
      <span>全选</span>
    </div>
    <div class="price">
      <span>合计 : {{totalPrice}}</span>
    </div>
    <div>
      <span class="calculate" @click="calcuClick">去结算({{counterIndex}})</span>
    </div>
  </div>
</template>

<script>
  import CheckBottom from "components/content/checkBottom/CheckBottom";

  import {mapGetters} from 'vuex'

  export default {
    name: "CartBottonBar",
    components: {
      CheckBottom
    },

    computed: {
      ...mapGetters(['cartList']),

      totalPrice() {
        return '￥' + this.$store.state.cartList.filter(item => item.check).reduce((p, item) => {
          return p += item.realPrice * item.count
        },0).toFixed(2)
      },
      counterIndex() {
        return this.$store.state.cartList.filter(item => item.check).length
      },
      //监听全选按钮
      isSelectAll() {
        //购物车没有数据的时候是不选中的
        if (this.$store.state.cartList.length === 0) return false
        //1.使用find函数， 查找数组中有没有为false的， 如果有就返回true，然后取反变为false不选中
        return !this.$store.state.cartList.find(item => !item.check)
      }
    },
    methods: {
      checkClick() {    //全部选中
        if (this.isSelectAll) {
          this.cartList.forEach(item => item.check = false)
        }else {       //全部不选中,或部分不选中
          this.cartList.forEach(item => item.check = true)
        }
      },
      //监听结算购物车中是否是选中的
      calcuClick() {
        if (!this.isSelectAll) {
          this.$toast.show('请选择购买商品')
        }
      }
    }
  }
</script>

<style scoped>
  .cart-botton {
    position: relative;
    display: flex;

    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background-color: #eee;

  }

  .check-content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 60px;
  }

  .checked {
    width: 15px;
    height: 15px;
    line-height: 20px;
    margin-right: 5px;
  }

  .price {
    margin-left: 10px;
    flex: 1;
  }

  .calculate {
    width: 100px;
    background-color: orangered;
    display: block;
    text-align: center;
    color: #fff ;
  }
</style>
