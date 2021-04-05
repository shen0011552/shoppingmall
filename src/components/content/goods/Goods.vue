<template>
  <div id="goods">
    <goods-item v-for="item in goodsList" :goods-item="item"/>
  </div>
</template>

<script>
  import GoodsItem from "./GoodsItem";

  export default {
    name: "Goods",
    props: {
      goodsList: {
        type: Array,
        default() {
          return []
        }
      },
    },
    components: {
      GoodsItem
    }
  }
</script>

<style scoped>
  #goods {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding: 2px;
  }

</style>
