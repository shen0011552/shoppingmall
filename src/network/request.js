import axios from 'axios'

export function request(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 1000
  })

  //2.1请求拦截器
  instance.interceptors.request.use( (config) => {
    return config
  },err => {
    console.log(err + '请求拦截失败');
  })
  //2.2响应拦截器
  instance.interceptors.response.use(result => {
    //服务器只需要返回data数据
    return result.data
  },err => {
    console.log(err + '响应拦截失败');
  })
  //3.发送网络请求
  return instance(config)
}

export function request2(config) {
  //1.创建axios实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:8000/api/w6',
    timeout: 1000
  })

  //2.1请求拦截器
  instance.interceptors.request.use( (config) => {
    return config
  },err => {
    console.log(err + '请求拦截失败');
  })
  //2.2响应拦截器
  instance.interceptors.response.use(result => {
    //服务器只需要返回data数据
    return result.data
  },err => {
    console.log(err + '响应拦截失败');
  })
  //3.发送网络请求
  return instance(config)
}
