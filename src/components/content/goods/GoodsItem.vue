<template>
  <div class="goods-item" @click="goodsClick">
    <img v-lazy="showImg" alt="" @load="imgLoad">
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "GoodsItem",
    props: {
      goodsItem: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      showImg() {
        return this.goodsItem.image || this.goodsItem.show.img
      }

    },
    methods: {
      //监听每一张图片的加载
      imgLoad() {
        this.$bus.$emit('imgGoodsLoad')
      },
      //监听点击跳转详情页
      goodsClick() {
        console.log(this.goodsItem.iid);
        this.$router.push('/detail/' + this.goodsItem.iid)
      },
    }
  }
</script>

<style scoped>
  .goods-item {
    width: 48%;
    padding-bottom: 40px;
    position: relative;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
     font-size: 12px;
    position: absolute;
    bottom: 5px;
    right: 0;
    left: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-tint);
    margin-right: 25px;
  }

  .goods-info .collect {
    position: relative;
  }

  /*添加图标*/
  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
