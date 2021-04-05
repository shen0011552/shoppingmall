<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link" >
        <img :src="item.image" alt="" @load="recommendsLoad">
      </a>
      <p>{{item.title}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommend",
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    },
    methods: {
      recommendsLoad() {
        this.$emit('recommendsLoad')
      }
    }
  }
</script>

<style scoped>
  .recommend {
    width: 100%;
    display: flex;
    padding: 10px 0 20px;
    border-bottom: 8px solid rgba(100, 100, 100, .15);
    text-align: center;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 70px;
    margin-bottom: 5px;
  }
  .recommend-item p {
    font-size: 13px;
  }
</style>
