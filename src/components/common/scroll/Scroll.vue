<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "Scroll",
    props: {
      probeType: {      //根据用户需求决定是否需要实时监听滚动,0,1  2  3(都有用户自己决定)
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null,      /*保存滚动的状态, 不会被mounted执行完之后回收*/
      }
    },
    mounted() {
      //1.创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })
      //2.监听滚动的位置
      if (this.probeType === 2 || this.probeType ===3){
        this.scroll.on('scroll', position => {
          //  谁想获取position就给谁发送过去
          this.$emit('scroll', position)
        })
      }

      //3.监听scroll滚动到底部
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          //不能能在这里完成上拉加载更多,把事件传出去
          this.$emit('pullingUp')
        })
      }

    },
    methods: {
      //监听回到顶部
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      //监听继续执行上拉加载更多
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      //刷新
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      //保存滚动位置
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }

    }

  }
</script>

<style scoped>
</style>
