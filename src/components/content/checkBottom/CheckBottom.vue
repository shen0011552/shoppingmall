<template>
  <div class="check-bottom" :class="{check: isCheck}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: "CheckBottom",
    props: {
      isCheck: {
        type: Boolean,
        default() {
          return false
        }
      }
    }
  }
</script>

<style scoped>
  .check-bottom {
    border-radius: 50%;
    border: 2px solid #ccc;
  }
  .check {
    border-color: var(--color-tint);
    background-color: var(--color-tint);
  }
</style>
