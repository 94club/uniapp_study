import Vue from 'vue'
import App from './App'
// import store from '@/store/index'
// import request from '@/common/request'
// import {logger,dump} from '@/common/logger'

//常用组件，全局注册
import tsBadge from '@/components/teaset/components/ts-badge.vue';
import tsIcon from '@/components/teaset/components/ts-icon.vue';
import tsTag from '@/components/teaset/components/ts-tag.vue';
import tsLoadMore from '@/components/teaset/components/ts-load-more.vue';
import tsButton from '@/components/teaset/components/ts-button.vue';
import tsSearchBar from '@/components/teaset/components/ts-search-bar.vue';
import tsBanner from '@/components/teaset/components/ts-banner.vue';
import tsLine from '@/components/teaset/components/ts-line.vue';
//全局注册
Vue.component('ts-badge', tsBadge);
Vue.component('ts-icon', tsIcon);
Vue.component('ts-tag', tsTag);
Vue.component('ts-load-more', tsLoadMore);
Vue.component('ts-button', tsButton);
Vue.component('ts-search-bar', tsSearchBar);
Vue.component('ts-banner', tsBanner);
Vue.component('ts-line', tsLine);
Vue.config.productionTip = false;
//挂载全局对象
// Vue.prototype.$store = store
// Vue.prototype.$request = request
// Vue.prototype.$logger =logger; // 日志记录器


//开发阶段使用Easy-mock模拟请求接口
//发行版本需要替换为实际的地址
Vue.prototype.$API_BASE = 'https://www.easy-mock.com/mock/5c28b8b9d84c733cb500c57c/framework' //API请求的基础地址
//注册全局组件
App.mpType = 'app'
const app = new Vue({
  store,
  request,
  ...App
})
app.$mount()
