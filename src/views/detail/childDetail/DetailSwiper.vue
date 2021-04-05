<template>
  <div class="detail-swiper">
    <swiper>
      <swiper-item v-for="item in detailBanner" class="detailSwiperImg">
        <img :src="item" alt="">
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index'

  export default {
    name: "DetailSwiper",
    props: {
      detailBanner: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      Swiper,
      SwiperItem
    }
  }
</script>

<style scoped>
  .detailSwiperImg {
    height: 300px;
    overflow: hidden;
  }
</style>
