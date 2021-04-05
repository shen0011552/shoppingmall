import {request, request2} from "./request";

//请求轮播图数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

//请求上上拉加载更多数据
export function getGoods(type, page) {
  return request2({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
