<template>
  <div class="cartList" >
    <scroll class="content" :probe-type="3" ref="scroll">
      <shop-cart-list-item v-for="(item, index) in cartList"
                      :key="index"
                      :item-info="item"/>
    </scroll>
  </div>
</template>

<script>
  import Scroll from "components/common/scroll/Scroll";

  import ShopCartListItem from "./ShopCartListItem";

  import { mapGetters } from 'vuex'
  export default {
    name: "ShopCartList",
    components: {
      Scroll,
      ShopCartListItem
    },
    computed: {
      ...mapGetters(['cartList'])
    },
    /*进入组件系统内部自调用这个函数*/
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cartList {
    height: calc(100% - 44px - 49px - 40px);
  }
  .content {
    height: 100%;
    overflow: hidden;
  }
</style>
