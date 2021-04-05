<template>
  <div id="home">
    <!--顶部导航栏-->
    <nav-bar class="home-nav"><div slot="center">购物车</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']"
                 @tabClick="tabClick"
                 v-show="isTabControl"
                 class="tab"
                 ref="tabControl2"/>
    <!--自己封装的滚动-->
    <scroll class="scroll"
            ref="scroll"
            :probe-type="3"
            :pull-up-load="true"
            @pullingUp="pullingUp"
            @scroll="isBackTop">
      <!--轮播图-->
      <home-swiper :banners="banners" @swiperLoad="swiperLoad"/>
      <!--推荐-->
      <home-recommend :recommends="recommends" @recommendsLoad="recommendsLoad"/>
      <!--特点推荐-->
      <home-feature-view/>
      <!--选项栏-->
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1"/>
      <!--上拉加载更多-->
      <goods :goods-list="goodsList[goodsType].list"/>
    </scroll>
    <!--回到顶部按钮-->
    <back-top v-show="isShowBackTop" @click.native="backClick"/>
  </div>
</template>

<script>
  /*导入公共组件*/
  import TabControl from "components/content/tabControl/TabControl";    //首页选项栏
  import Goods from "components/content/goods/Goods";       //上拉加载更多
  import Scroll from "components/common/scroll/Scroll";     //滚动
  import BackTop from "components/content/backTop/BackTop"; //回到顶部按钮
  import {itemListenerMixin, backTopMixin} from "common/mixin"

  /*导入子组件*/
  import NavBar from "components/common/navbar/NavBar";     //顶部导航栏
  import HomeSwiper from "./homeChild/HomeSwiper";          //首页轮播图
  import HomeRecommend from "./homeChild/HomeRecommend";    //首页推荐
  import HomeFeatureView from "./homeChild/HomeFeatureView";  //首页特点推荐

  /*网络请求*/
  import {getHomeMultidata, getGoods} from "network/home";

  export default {
    name: "Home",
    components:{
      /*子组件*/
      NavBar,
      HomeSwiper,
      HomeRecommend,
      HomeFeatureView,
      /*公共组件*/
      TabControl,
      Goods,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],           //保存首页轮播图图片
        recommends: [],        //保存推荐数据
        goodsList: {          //保存上拉加载更多数据
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        goodsType: 'pop',          //保存上拉加载更多的状态
        isTabControl: false,      //保存选项卡的显示和隐藏
        swiperHeight: 0,          //保存轮播图的高度
        recommendsHeight: 0,      //保存特点推荐的图片
        leaveY: 0,             //保存组件离开时的位置
      }
    },
    created() {
      //请求轮播图数据
      this.getHomeMultidata()
      //上拉加载更多数据请求
      this.getGoods('pop')
      this.getGoods('new')
      this.getGoods('sell')
    },

    mixins: [itemListenerMixin, backTopMixin],

    /*mounted() {
      //处理高度塌陷,  刷新重新计算高度
      const refresh = debounce(this.$refs.scroll.refresh, 100)
      this.$bus.$on('imgGoodsLoad', () => {
        refresh()
      })
    },*/
    /*监听组件处于活跃(进入组件)*/
    activated() {
      //监听进入组件时滚动到离开时的位置
      this.$refs.scroll.scrollTo(0, this.leaveY, 0)
      //滚动到保存的位置要对页面进行一次刷新,重新计算高度
      this.$refs.scroll.refresh()

    },
    /*监听组件不活跃(离开组件)*/
    deactivated() {
      //监听组件离开记录位置
      this.leaveY = this.$refs.scroll.getScrollY()
      this.$bus.$off('imgGoodsLoad', this.itemImageListener)
    },

    methods: {
      /*事件监听*/
      //接收选项卡tabControl发射出来的事件
      tabClick(index) {
        switch (index) {
          case 0:
            this.goodsType = 'pop'
            break
          case 1:
            this.goodsType = 'new'
            break
          case 2:
            this.goodsType = 'sell'
            break
        }

        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index

      },

      //监听图片上拉加载更多
      pullingUp() {
        this.getGoods(this.goodsType)
      },

      //监听回到顶部按钮显示和隐藏
      isBackTop(position) {
        this.isShowBackTop = position.y < -1000 ? true : false
        this.isTabControl = -(position.y) > this.swiperHeight ? true : false
        this.isTabControl = -(position.y) > this.recommendsHeight ? true : false
      },

      //监听轮播图的图片加载完成
      swiperLoad() {
        this.swiperHeight = this.$refs.tabControl1.$el.offsetTop
      },
      //监听特点推荐的加载完成
      recommendsLoad() {
        this.recommendsHeight = this.$refs.tabControl1.$el.offsetTop
      },

      /*网络请求*/
      //轮播图 和 推荐的数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res.data.recommend.list);
          //1. 轮播图数据
          this.banners = res.data.banner.list
          //推荐数据
          this.recommends = res.data.recommend.list
        }).catch(err => {
          console.log(err + '轮播图数据请求失败')
        })
      },

      //上拉加载更多
      getGoods(type) {
        const page = this.goodsList[type].page + 1
        getGoods(type, page).then(res => {
          // console.log(res.data.list);
          this.goodsList[type].list.push(...res.data.list)
          this.goodsList[type].page += 1
          //监听上拉加载更多  监听滚动到底部
          this.$refs.scroll.finishPullUp()
        }).catch(err => {
          console.log(err + '首页上拉加载更多请求失败')
        })
      }

    },
  }
</script>

<style scoped>
  /*设置给滚动的高度*/
  #home {
    height: 100vh;
    position: relative;
  }
  .scroll {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
  }

  .home-nav {
    color: #fff;
    font-weight: 500;
    font-size: 15px;
    background-color: var(--color-tint);
  }
  .tab {
    position: relative;
    z-index: 9;
  }

</style>
