<template>
  <div id="detail">
    <!--详情页顶部导航栏-->
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"/>
    <scroll class="detail-content" ref="scroll" :probe-type="3" @scroll="scrollPosition">
      <!--详情页轮播图-->
      <detail-swiper :detail-banner="detailBanner"/>
      <!--详情页标题-->
      <detail-title :goods="detailTitle"/>
      <!--详情页店铺信息-->
      <detail-shop-info :shop="shop"/>
      <!--详情页图片展示-->
      <detail-desc-info :detail-info="detailInfo" @imgLoad="imgLoad"/>
      <!--详情页参数信息-->
      <detail-param-info :param-info="paramInfo" ref="param"/>
      <!--详情页评论信息-->
      <detail-comment :comment="comment" ref="comment"/>
      <!--详情页上拉加载更多-->
      <goods :goods-list="recommend" @imgGoodsLoad="imgGoodsLoad" ref="recommend"/>
    </scroll>
    <!--回到顶部按钮-->
    <back-top v-show="isShowBackTop" @click.native="backClick"/>
    <!--底部导航栏-->
    <detail-botton-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
  /*公共组件*/
  import Scroll from "components/common/scroll/Scroll";             //导入自己封装好的滚动
  import Goods from "components/content/goods/Goods";               //上拉加载更多组件
  import  {itemListenerMixin, backTopMixin} from "common/mixin";

  import {debounce} from "common/utils";

  /*子组件*/
  import DetailNavBar from "./childDetail/DetailNavBar";            //详情页顶部导航栏
  import DetailSwiper from "./childDetail/DetailSwiper";            //详情页轮播图
  import DetailTitle from "./childDetail/DetailTitle";              //详情页标题
  import DetailShopInfo from "./childDetail/DetailShopInfo";         //详情页店铺信息
  import DetailDescInfo from "./childDetail/DetailDescInfo";        //详情页图片展示
  import DetailParamInfo from "./childDetail/DetailParamInfo";      //详情页参数信息
  import DetailComment from "./childDetail/DetailComment";          //详情页评论信息
  import DetailBottonBar from "./childDetail/DetailBottonBar";      //详情页底部导航栏

  /*网路请求*/
  import {
    getDetail,
    GoodsInfo,
    Shop,
    GoodsParam,
    getRecommend} from "../../network/detail";
  import {mapActions} from 'vuex'

  export default {
    name: "Detail",
    components: {
      /*公共组件*/
      Scroll,
      Goods,

      /*子组件*/
      DetailNavBar,
      DetailSwiper,
      DetailTitle,
      DetailShopInfo,
      DetailDescInfo,
      DetailParamInfo,
      DetailComment,
      DetailBottonBar
    },
    data() {
      return {
        iid: null,         //动态保存网络请求的iid
        detailBanner:[],   //保存详情页轮播图数据
        detailTitle: {},   //保存商品的标题
        shop: {},           //保存店铺信息
        detailInfo: {},     //保存图片展示信息
        paramInfo: {},       //保存参数信息
        comment: {},         //保存评论信息
        recommend: [],        //保存推荐数据
        getThemeTopY: null,    //保存导航栏节点
        themeTopY: [],        //保存详情页导航栏的个节点的位置
        currentIndex: 0,      //记录顶部导航栏的下标
      }
    },
    deactivated() {
      //监听组件离开， 关闭上拉加载图片刷新
      this.$bus.$off('imgGoodsLoad', this.itemImageListener)
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.保存详情页的数据
      getDetail(this.iid).then(res => {
        console.log(res);
        const data = res.result
        //2-1.请求详情页的轮播图数据
        this.detailBanner = data.itemInfo.topImages
        //2-2.获取商品标题信息
        this.detailTitle = new GoodsInfo(data.itemInfo, data.columns, data.shopInfo.services)
        //2-3.获取店铺的信息
        this.shop = new Shop(data.shopInfo)
        //2.4.获取图片展示信息
        this.detailInfo = data.detailInfo
        //2-5.获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //2.6.获取评论信息
        if(data.rate.cRate !==0) {
          this.comment = data.rate.list[0]
        }

        this.getThemeTopY =debounce(() => {
          this.themeTopY.push(0)
          this.themeTopY.push(this.$refs.param.$el.offsetTop)
          this.themeTopY.push(this.$refs.comment.$el.offsetTop)
          this.themeTopY.push(this.$refs.recommend.$el.offsetTop)
          this.themeTopY.push(Number.MAX_VALUE)
        },100)
      })
      //请求推荐数据
      getRecommend().then(res => {
        this.recommend = res.data.list
      })
    },
    //混入写法: 抽离重复的代码
    mixins: [itemListenerMixin, backTopMixin],
    methods: {
      ...mapActions(['addCart']),

      //监听详情页图片展示
      imgLoad() {
        //图片加载完, 要进行刷新重新计算一下高度
        this.$refs.scroll.refresh()

        //图片挂载之后,就要记录元素的位置
        this.getThemeTopY()
      },
      //监听上拉加载更多的图片进行防抖
      imgGoodsLoad() {
        //使用混入里面的方法:
        this.newRefresh()
      },
      //监听详情页的顶部导航栏点击事件
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200)
      },
      //监听滚动导航栏的文字颜色改变事件
      scrollPosition(position) {
        const positionY = -position.y
        const length = this.themeTopY.length
        for (let i = 0; i < length-1; i++) {
          if (this.currentIndex !== i && (positionY >= this.themeTopY[i]) && positionY < this.themeTopY[i+1]) {
            this.currentIndex = i
            this.$refs.detailNav.isActive = this.currentIndex
          }
        }

        this.isShowBackTop = positionY >= 1000 ? true : false
      },
      addToCart() {
        const product = {}
        product.iid = this.iid    //唯一标识
        product.image = this.detailBanner[0]
        product.title = this.detailTitle.title
        product.desc = this.detailTitle.desc
        product.realPrice  = this.detailTitle.realPrice
        this.addCart(product).then(res => {
          this.$toast.show(res, 2000)

        })
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    height: 100vh;  /*视口高度*/
  }

  .detail-nav {
    background-color: #fff;
    position: relative;
    z-index: 9;
  }

  .detail-content {
    height: calc(100% - 44px - 49px); /*滚动的高度*/
    overflow: hidden;
  }
</style>
