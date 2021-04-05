<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tabbar {
    display: flex;
    position: fixed;
    text-align: center;
    height: 49px;
    bottom: 0;
    right: 0;
    left: 0;
    box-shadow: 0 -1px 3px rgba(100, 100, 100, .2);
    background-color: #fff;
  }


</style>
