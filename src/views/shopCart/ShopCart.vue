<template>
  <div class="shop-cart">
    <nav-bar class="shop-nav"><div slot="center">购物车({{cartLength}})</div></nav-bar>
    <shop-cart-list/>
    <shop-cart-botton-bar class=""/>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  import ShopCartList from "./childShopCart/ShopCartList";
  import ShopCartBottonBar from "./childShopCart/ShopCartBottonBar";
  import {mapGetters} from 'vuex'
  export default {
    name: "ShopCart",
    components: {
      NavBar,
      ShopCartList,
      ShopCartBottonBar
    },
    computed: {
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .shop-cart {
    height: 100vh;
  }
  .shop-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: bold;
  }
</style>
