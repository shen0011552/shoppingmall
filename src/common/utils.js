
//防抖函数
export function debounce(func, delay) {
  let timer = null
  return function (...args) {         //返回一个函数
    if(timer) clearTimeout(timer)     //判断上一次有没有开启定时器,有就清空
    timer = setTimeout(() => {   //开启一个延迟操作
      func.apply(this, args)      //apply 回调func函数,
    }, delay)
  }
}

// 如果传过来是个单数,前面加个0
function padLeftZero (str) {
  return ('00' + str).substr(str.length);
};

//正则表达式是该干什么的? 字符串匹配 利器(难 , 规则太多)
//y+ , : +表示匹配1个或者多个 y
//y* , : 表示匹配0个或者多个 y
//y? , : 表示匹配0个或者1个 y
// 封装格式化时间正则函数  (时间, '格式化')
export function formatDate(date, fmt) {
  //1.获取年份
  //RegExp.$1 表示全局对象表示匹配到了yyyy替换成功,(date....的结果 ), substr:截取
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  //2. 获取
  //M+ -> 正则表达式中的一个规则
  //M+ : 表示匹配1个或多个 M
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    }
  }
  return fmt;
};
