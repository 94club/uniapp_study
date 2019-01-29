
// 目前没有针对uni的Fly版本，使用wx版本没有问题
import store from '@/store'

// #ifdef H5
import Fly from 'flyio/dist/npm/fly'
// #endif

// #ifndef H5
import Fly from 'flyio/dist/npm/wx'
// #endif

const flyInstance = new Fly();

flyInstance.interceptors.request.use((config) => {
  uni.showLoading({
    title: '正在努力加载中...'
  });

  config.baseURL = 'http://127.0.0.1:8360/admin';

  const token = store.getters['token/getToken'];
  if (token) {
    //给所有请求添加自定义header
    config.headers["Authorization"] = token;
  }

  // 防止缓存
  if (config.method === 'POST' && config.headers['Content-Type'] !== 'multipart/form-data') {
    config.body = {
      ...config.body,
      _t: Date.parse(new Date()) / 1000
    }
  } else if (config.method === 'GET') {
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params
    }
  }
  return config
})

flyInstance.interceptors.response.use(function (response) { //不要使用箭头函数，否则调用this.lock()时，this指向不对 {
  let errmsg = '';
  const data = response.data;
  if (!data || typeof data !== 'object') {
    errmsg = '服务器响应格式错误';
    uni.showToast({
      title: errmsg,
      icon: 'none'
    })
  } else {
    const errno = data.errno;
    switch (errno) {
    case 1001:
      // 数据检验未通过
      for (let i in data.data) {
        errmsg += data.data[i] + ';'
      }
      break;
    default:
      errmsg = data.errmsg;
      break
    }
    if (errmsg !== '' && errno !== 0) {
      uni.showToast({
        title: errmsg,
        icon: 'none'
      })
    }
    if (errmsg !== '' && errno === 0) {
      uni.showToast({
        title: errmsg,
        icon: 'none'
      })
    }
  }
  uni.hideLoading();
  return response.data; //只返回业务数据部分
}, function (err) {
  console.log("error-interceptor:" + JSON.stringify(err))
  let errmsg = err.message;
  switch (err.status) {
  case 0:
    errmsg = "网络连接错误";
    break;
  case 401:
    errmsg = '请登录后操作';
    store.dispatch('logout');
    uni.redirectTo({
      url: '/pages/auth/login'
    })
    break
  }
  uni.showToast({
    title: errmsg,
    icon: 'none'
  })
})

export default request
