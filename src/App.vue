<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>


import MainTabBar from "components/content/mainTabBar/MainTabBar";  //底部导航栏

export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  /*导入去除默认样式*/
  @import "assets/css/base.css";
</style>
