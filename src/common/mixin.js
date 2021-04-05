import {debounce} from "./utils";
import BackTop from "components/content/backTop/BackTop";

//混入, 只要导入,组件里面都有属性, 例如data, methods, computed
export const itemListenerMixin = {
  data() {
    return {
      itemImageListener: null,
      newRefresh: null,
    }
  },
  created() {},
  //组件元素挂载好之后执行mounted
  mounted() {
    //1. 图片加载完成的事件监听
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100)
    //对监听的事件进行保存
    this.itemImageListener = () => {
      //对这里进行防抖
      this.newRefresh()
    }
    this.$bus.$on('imgGoodsLoad', this.itemImageListener)
  },
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 300)
    }
  },
}
