<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles"
         class="tab-control-item"
         @click="tabClick(index)">
      <span :class="{active: currentIndex === index}">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      /*监听选项卡事件*/
      tabClick(index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    width: 100%;
    height: 40px;
    display: flex;
    text-align: center;
    font-size: 15px;
    background-color: #fff;
    line-height: 40px;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding-bottom: 5px;
  }

  .active {
    color: var(--color-tint);
    border-bottom: 1px solid var(--color-tint);
  }
</style>
