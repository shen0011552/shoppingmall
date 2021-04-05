<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" class="back" @click="navClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      <div slot="center" class="back-center">
        <div v-for="(item,index) in titles"
             :class="{active: isActive === index}"
             class="back-item" @click="backClick(index)">{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/NavBar";
  export default {
    name: "DetailNavBar",
    data() {
      return {
        titles: ['商品', '参数', '评论', '推荐'],
        isActive: 0
      }
    },
    methods: {
      //监听点击返回按钮
      navClick() {
        this.$router.back()
      },
      //监听点击顶部导航栏事件
      backClick(index) {
        this.isActive = index
        this.$emit('titleClick', index)
      }
    },
    components: {
      NavBar
    },
  }
</script>

<style scoped>
  .detail-nav {
    background-color: #fff;
  }
  .back {
    margin-top: 5px;
  }
  .back img {
    width: 18px;
  }

  .back-center {
    display: flex;
  }
  .back-center .back-item{
    flex: 1;
    font-size: 13px;
  }

  .active{
    color: var(--color-tint);
  }
</style>
