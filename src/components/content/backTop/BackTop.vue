<template>
  <div class="backtop">
    <img src="~assets/img/common/top.png" alt="">
  </div>
</template>

<script>
  export default {
    name: "BackTop"
  }
</script>

<style scoped>
  .backtop {
    position: absolute;
    right: 5px;
    bottom: 50px;
    z-index: 9;
  }

  .backtop img {
    width: 40px;
  }
</style>
