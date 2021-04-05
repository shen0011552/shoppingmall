import {request2} from "./request";

/*请求详情页数*/
export function getDetail(iid) {
  return request2({
    url: '/detail',
    params: {
      iid
    }
  })
}

//设置详情页 标题 信息类
export class GoodsInfo {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title               //获取详情页  标题
    this.desc = itemInfo.desc                 //获取详情页  描述
    this.newPrice = itemInfo.price            //获取详情页  新价格
    this.oldPrice = itemInfo.oldPrice         //获取详情页  旧价格
    this.discount = itemInfo.discountDesc
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

//设置详情页 店铺 信息类
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.score = shopInfo.score
    this.goodsCount = shopInfo.cGoods
    this.sells = shopInfo.cSells
    this.fans = shopInfo.cFans
  }
}
//设置详情页 参数 信息类
export class GoodsParam {
  constructor(info, rule) {
    //注: images可能没有值 (某些商品有值, 某些没有值)
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set
    this.size = rule.tables
  }
}

//请求详情页数据
//请求详情页Goodsitem数据
export function getRecommend() {
  return request2({
    url: '/recommend'
  })
}
