/*
 * @Author: SHEN
 * @Date: 2020-05-27 10:12:39
 * @Last Modified by: SHEN
 * @Last Modified time: 2021-03-12 14:05:56
 */
import axios, { CancelToken } from 'axios'
import Qs from 'qs'

// axios 的拦截器
axios.interceptors.response.use(function (response) {
  return response.data.data
}, function (error) {
  return Promise.reject(error)
})

class NetTask {
  /**
   * 构造函数
   * @param {*} url 请求路径
   * @param {*} data 请求参数
   * @param {*} method 请求方法：get / post
   * @param {*} index 一个递增序号，用于标记
   */
  constructor(url, data, method = 'get', index = 0) {
    this.url = url
    this.data = data
    this.method = method
    this.index = index
    this.headers = {}
    this.timeout = 100000

    this.cancelToken = new CancelToken((c) => {
      this._cancel = c
    })
  }
  start() {
    let { url, data, headers, method, timeout, cancelToken } = this
    const baseURL = 'http://127.0.0.1:7001'

    headers = Object.assign(method === 'get' ? {
      'X-Requested-With': 'XMLHttpRequest',
      'Accept': 'application/json',
      'Content-Type': 'application/json; charset=UTF-8'
    } : {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }, headers)

    let defaultConfig = {
      baseURL,
      url,
      method,
      data,
      params: data,
      timeout,
      headers,
      cancelToken,
      responseType: 'json'
    }
    if (method === 'get') {
      delete defaultConfig.data
    } else {
      delete defaultConfig.params
    }
    // const contentType = headers['Content-Type']

    // if (typeof contentType !== 'undefined') {
    //   if (~contentType.indexOf('multipart')) {
    //   // 类型 `multipart/form-data;`
    //     defaultConfig.data = data
    //   } else if (~contentType.indexOf('json')) {
    //   // 类型 `application/json`
    //   // 服务器收到的raw body(原始数据) "{name:"jhon",sex:"man"}"（普通字符串）
    //     defaultConfig.data = JSON.stringify(data)
    //   } else if (~contentType.indexOf('xml')) {
    //   // 类型 `text/xml`
    //     defaultConfig.data = data
    //   } else {
    //   // 类型 `application/x-www-form-urlencoded`
    //   // 服务器收到的raw body(原始数据) name=homeway&key=nokey
    //     defaultConfig.data = Qs.stringify(data)
    //   }
    // }
    return axios(defaultConfig)
  }
  cancel() {
    this._cancel && this._cancel()
  }
}

class NetTool {
  constructor() {
    this.index = 0
    this.tasks = []
    this.baseURL = ''
  }
  /**
   * 添加任务并开始
   * @param {*} task NetTask 任务
   */
  addTask(task) {
    // 给任务添加标记号
    task.index = this.index

    // 添加任务到队列
    this.tasks.push(task)

    // 任务标记递增
    this.index += 1

    // 返回一个 Promise，对接口返回数据进行了封装
    return new Promise((resolve, reject) => {
      task.start().then(res => {
        resolve(res)
      }).catch(e => reject(e)).finally(() => {
        this._removeTask(task)
        console.log('NetTool 剩余任务数：', this.tasks.length)
      })
    })
  }
  /**
   * 取消队列中所有任务
   */
  cancelAll() {
    this.tasks.forEach(task => task.cancel())
  }
  /**
   * 任务完成后从队列中删除任务，通过任务的 index 标记
   * @param {*} task
   */
  _removeTask(task) {
    this.tasks = this.tasks.filter(_task => _task.index !== task.index)
  }
}

// 全局单一实例
const netTool = new NetTool()

// 挂载在 window 下
window.netTool = netTool
window.NetTask = NetTask

export {
  NetTask,
  netTool
}
