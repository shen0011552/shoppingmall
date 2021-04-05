<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-active"></slot></div>
    <div :style="styleColor"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,         //path路径
      isColor: {            //文字颜色
        type: String,
        default() {
          return 'red'
        }
      }
    },
    computed: {
      //监听图片颜色切换
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      //监听文字颜色切换
      styleColor() {
        return this.isActive ? {color: this.isColor} : ''
      }
    },
    methods: {
      //监听导航栏点击进行路由跳转
      itemClick() {
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    font-size: 13px;
  }
  .tab-bar-item img {
    width: 20px;
    height: 20px;
    vertical-align: middle;
    margin-bottom: 2px;
    margin-top: 5px;
  }
</style>
