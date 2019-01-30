<template>
	<view class="ts-column ts-full-width" style="background: #E0E0E0;">
		<view class="store-images-swiper-box">
			<swiper autoplay interval="3000" circular :indicator-dots="true">
				<swiper-item v-for="img in config.home_swiper_images" :key="img">
					<view class="store-images-img-box">
						<view class="store-images-img">
							<image :src="img"></image>
						</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
		<ts-banner :image="config.cover_image" height="250"></ts-banner>
		<view class="ts-row" style="background-color: #FF6600;">
			<view class="ts-row ts-flex-item ts-padding-left ts-padding-right">
				<ts-scroll-message :messages="config.messages"></ts-scroll-message>
			</view>
		</view>
		<view class="ts-row" style="background-color: #FFF;">
			<navigator url="/pages/app/esc/index" open-type="switchTab" hover-class="navigator-hover" class="ts-flex-item">
				<view class="ts-column ts-flex-item  ts-center ts-padding">
					<image style="width: 80upx; height: 80upx;" src="../../static/tabbar/syb.png"></image>
					<text>校企通</text>
				</view>
			</navigator>
			<navigator url="/pages/app/syb/index" open-type="switchTab" hover-class="navigator-hover" class="ts-flex-item">
				<view class="ts-column ts-flex-item  ts-center ts-padding">
					<image style="width: 80upx; height: 80upx;" src="../../static/tabbar/syb.png"></image>
					<text class="ts-h5">创业谷</text>
				</view>
			</navigator>
			<navigator url="/pages/app/activity/index" hover-class="navigator-hover" class="ts-flex-item">
				<view class="ts-column ts-flex-item  ts-center ts-padding">
					<image style="width: 80upx; height: 80upx;" src="../../static/tabbar/syb.png"></image>
					<text class="ts-h5">活动</text>
				</view>
			</navigator>
			<navigator url="/pages/app/work-study/index" hover-class="navigator-hover" class="ts-flex-item">
				<view class="ts-column ts-flex-item  ts-center ts-padding">
					<image style="width: 80upx; height: 80upx;" src="../../static/tabbar/syb.png"></image>
					<text class="ts-h5">兼职</text>
				</view>
			</navigator>
		</view>
		<view class="ts-gap"></view>
		<view class="ts-row ts-padding" style="background-color: #007AFF;">
			<text class="ts-h4">最新校园活动</text>
		</view>
    <block v-for="(app,index) in eventList" :key="index">
			<block v-if="app && app.data">
				<block  v-for="(item,idx) in app.data" :key="idx">
					<view class="ts-row" style="margin-left: 10upx; margin-right: 10upx; padding: 10upx; background-color: #FFF;">
						<view class="ts-column ts-flex-item" hover-class="ts-list-cell-hover" @tap="showDetail(app.type, item.id)">
							<view class="ts-column ts-flex-item">
								<!-- <view class="ts-row ts-h4 ts-padding-top ts-padding-bottom">{{item.title}}</view> -->
								<view class="ts-row">
									<image :src="item.cover_image" style="width: 100%; height: 250upx;"></image>
								</view>
								<view class="ts-row  ts-padding-top ts-padding-bottom" style="justify-content: space-between;">
									<view class="ts-h5">{{item.title}}</view>
									<ts-tag type="danger" :text="app.type.title" size="small"></ts-tag>
								</view>
							</view>
							<view class="ts-row" style="justify-content: space-between; align-items: center; border-top: #EEEEEE solid 1upx; padding: 10upx 0upx;">
								<view class="ts-h5">
									立即查看
								</view>
								<ts-icon type="arrowright" size="32" color="#bbb"></ts-icon>
							</view>
						</view>
					</view>
					<view class="ts-gap"></view>
				</block>
			</block>
		</block>
		<view class="ts-column">
			<ts-load-more :loadingType="loadingType" @tap="getEventListMoreData"></ts-load-more>
		</view>
	</view>
</template>
<script>
	import tsAd from '@/components/teaset/components/ts-ad.vue'
	import tsScrollMessage from '@/components/teaset/components/ts-scroll-message.vue'
	import urls from '../../common/urls.js'
	export default {
		components: {
			tsAd,
			tsScrollMessage
		},
		data () {
			return {
				config: {},
				loadingType: 0, // 上拉的状态：0-loading前；1-loading中；2-没有更多了
				page: 0,
				eventList: []
			}
		},
		onPullDownRefresh () {
			this.getAppConfig()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 500)
		},
		onLoad (options) {
			this.init()
			this.getAppConfig()
			this.getEventListMoreData()
		},
		onReachBottom () {
			this.getEventListMoreData()
		},
		methods: {
			openBeidian () {
				// #ifdef APP-PLUS
				const api = 'https://m.beidian.com/shop/shopkeeper.html?shop_id=682731&utm_source=bd_dpewmtp'
				plus.runtime.openURL(api)
				// #endif
			},
			getAppConfig () {
				const api = this.$API_BASE + '/getAppConfig'
				uni.request({
					url: api,
					dataType: 'json',
					method: 'GET',
					data: {},
					success: (response) => {
						const res = response.data
						this.config = res.data
					}
				})
			},
			init () {
				//获取用户当前的坐标信息
				this.loadingType = 0
				this.storeList = []
				this.page = 0
			},
			showDetail (type, id) {
				// const url = `/pages/app/${type.app}/detail?id=${id}`
				// uni.navigateTo({
				// 	url: url
				// })
				uni.showToast({
					title: '暂未添加点击事件',
					icon: 'none'
				})
			},
			getEventListMoreData () {
				//上拉的状态：0-loading前；1-loading中；2-没有更多了
				if (this.loadingType !== 0) {
					return
				}
				this.loadingType = 1
				this.page = this.page + 1
				uni.request({
					url: this.$API_BASE + `/message/getEventList`,
					method: 'GET',
					dataType: 'json',
					data: {
						page: this.page,
					},
					success: (response) => {
						const res = response.data
						if (res.success) {
							const data = res.data
							if (data) {
								this.eventList = this.eventList.concat(data)
							}
							if (res.has_more === false) {
								this.loadingType = 2 //2-没有更多了
							} else {
								this.loadingType = 0 //开启新一轮加载
							}
						} else {
							console.log(res.message)
						}
					}
				})
			}
		}
	}
</script>

<style>
	.store-images-swiper-box,
	swiper,
	swiper-item {
		width: 100%;
		height: 250upx;
	}

	.store-images-img-box {
		width: 100%;
		height: 250upx;
		box-sizing: border-box;
		/* padding: 20upx; */
	}

	.store-images-img {
		width: 100%;
		height: 100%;
		background: #4CD964;
		/* border-radius: 20upx; */
		overflow: hidden;
	}

	.store-images-img image {
		width: 100%;
		height: 100%;
	}
</style>
