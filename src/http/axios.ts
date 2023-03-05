import axios from 'axios'
import qs from 'qs'

const instance = axios.create({
  // baseURL: (process.env.API_BASE || '') + '/api',
  baseURL: "http://vfxxrf.natappfree.cc",
  timeout: 30 * 1000,
  // headers: {'X-Custom-Header': 'foobar'}
});


const pendding = new Map()

function handlePeddingData(config) {
  const { method, url, params, data } = config

  const reqData = [method, url, qs.stringify(params), qs.stringify(data)].join('&')
  return reqData
}

/**
 * 请求前——如果已存在相同的请求，则取消；同时将当前请求加到pedding
 * @param {*} config 
 */
function addPending(config) {
  const reqData = handlePeddingData(config)
  if (pendding.has(reqData)) {
    const cancel = pendding.get(reqData)
    cancel(reqData)
    pendding.delete(reqData)

  }

  config.cancelToken = new axios.CancelToken(cancel => {
    pendding.set(reqData, cancel)
  })
}

/**
 * 响应后——将当前请求从pedding中移除
 * @param {*} config 
 */
function removePending(config) {
  const reqData = handlePeddingData(config)
  if (pendding.has(reqData)) {
    pendding.delete(reqData)
  } else {
    // console.log('没有找到请求的token', pendding)
  }
}

instance.interceptors.request.use(config => {
  addPending(config)
  return config
}, error => {
  return Promise.reject(error)
})

instance.interceptors.response.use(res => {
  removePending(res.config)
  return res.data
}, error => {
  if (axios.isCancel(error)) {
    console.log('此请求被取消', error)
  }
  console.error('请求出错', error)
  return Promise.reject(error)
})

export default instance