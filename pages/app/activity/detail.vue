<template>
	<view class="ts-column ts-flex-item">
		<view class="ts-row">
			<view class="ts-column ts-flex-item" style="align-items:flex-start; justify-content: flex-end; height: 400upx;"
			 :style="styleString">
				<view class="ts-column ts-padding">
					<view class="ts-row">
						<text class="ts-row ts-h3 ts-text-bold ts-text-white">{{eventInfo.title}}</text>
					</view>
					<view class="ts-row">
						<text class="ts-row ts-h5 ts-text-white">{{eventInfo.address}}</text>
					</view>
					<view class="ts-row ts-h5 ts-text-white">
						<view class="ts-row">#ID:{{eventInfo.id}}#</view>
						<view class="ts-row ts-padding-left">#已报人数:{{eventInfo.member_has_signed}}/{{eventInfo.member_max}}#</view>
					</view>
				</view>
			</view>
		</view>
		<view class="ts-column ts-flex-item">
			<ts-segmented-control :values="tabs" v-model="currentTab" style-type="text" active-color="#d81e06" borderColor="#d81e06"></ts-segmented-control>
			<view class="ts-row">
				<view v-show="currentTab === 0" class="ts-column ts-flex-item ts-padding">
					<!-- 详情 -->
					<view class="ts-row">
						<view class="ts-row">
							<view class="ts-row ts-margin-right">
								<image :src="eventInfo.organizer_badge" style="width: 100upx; height: 100upx;"></image>
							</view>
							<view class="ts-column">
								<view class="ts-row ts-h4 ts-text-bold">{{eventInfo.organizer}}</view>
								<view class="ts-row ts-h5">
									<ts-badge type="warn" :text="eventInfo.type"></ts-badge>
									<ts-badge v-for="(tag,index) in eventInfo.tags" :key="index" type="warn" :text="tag" :padding-left="10"></ts-badge>
								</view>
							</view>
						</view>
						<view class="ts-row ts-flex-item" style="justify-content: flex-end;">
							<!-- <ts-badge type="primary" text="73"></ts-badge> -->
						</view>
					</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h4 ts-text-bold">参与须知</view>
					<view class="ts-row ts-h5" style="justify-content: space-between;">
						<view class="ts-flex">活动相关信息及参与需求</view>
						<view class="ts-flex">
							<ts-badge type="primary" :text="eventInfo.entrance_way"></ts-badge>
						</view>
					</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h5">{{eventInfo.guidelines}}</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h4 ts-text-bold">综合评分</view>
					<view class="ts-row ts-h5" style="justify-content: space-between;">
						<view class="ts-row">该项目综合评分</view>
						<view class="ts-row">
							<ts-badge type="primary" :text="eventInfo.score"></ts-badge>
						</view>
					</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h4 ts-text-bold">活动花絮</view>
					<view class="ts-row ts-h5">
						<view class="ts-row">分享你的活动精彩记录</view>
					</view>
					<view class="ts-gap"></view>
					<view class="ts-row" style="flex-wrap: wrap;">
						<image v-for="(img,index) in eventInfo.images" :key="index" :src="img" mode="" class="image-box"></image>
					</view>
				</view>
				<view v-show="currentTab === 1" class="ts-column ts-flex-item ts-padding">
					<!-- 信息 -->
					<view class="ts-row ts-h4 ts-text-bold">活动介绍</view>
					<view class="ts-row ts-h5">
						<view class="ts-row">{{eventInfo.description}}</view>
					</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h4 ts-text-bold">时间范围</view>
					<view class="ts-row ts-h5" style="justify-content: space-between;">
						<view class="ts-row">报名时间</view>
						<view class="ts-row">{{eventInfo.registration_time}}</view>
					</view>
					<view class="ts-row ts-h5" style="justify-content: space-between;">
						<view class="ts-row">活动时间</view>
						<view class="ts-row">{{eventInfo.time}}</view>
					</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h4 ts-text-bold">活动级别</view>
					<view class="ts-row ts-h5" style="justify-content: space-between;">
						<view class="ts-row">本次活动级别</view>
						<view class="ts-row">
							<ts-badge type="danger" :text="eventInfo.type"></ts-badge>
						</view>
					</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h4 ts-text-bold">报名人数</view>
					<view class="ts-row ts-h5" style="justify-content: space-between;">
						<view class="ts-row">当前活动报名人数限制</view>
						<view class="ts-row">
							<ts-badge type="danger" :text="eventInfo.member_max"></ts-badge>
						</view>
					</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h4 ts-text-bold">学分设置</view>
					<view class="ts-row ts-h5" style="justify-content: space-between;">
						<view class="ts-row ts-h5">学时</view>
						<view class="ts-row ts-h5">学分:{{eventInfo.credit && eventInfo.credit.score}}，限额{{eventInfo.credit && eventInfo.credit.claimer_count}}人</view>
					</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h4 ts-text-bold">活动标签</view>
					<view class="ts-row ts-h5" style="justify-content: space-between;">
						<view class="ts-row">当前活动标签</view>
						<view class="ts-row">
							<block v-for="(tag,index) in eventInfo.tags" :key="index">
								<view class="ts-row ts-padding-left">
									<ts-badge type="warn" :text="tag"></ts-badge>
								</view>
							</block>
						</view>
					</view>
					<view class="ts-gap"></view>
				</view>
				<view v-show="currentTab === 2" class="ts-column ts-flex-item ts-padding">
					<!-- 人员 -->
					<block v-for="(member,index) in eventInfo.members" :key='index'>
						<view class="ts-row">
							<view class="ts-row">
								<view class="ts-margin-right">
									<image :src="member.head_image" style="width: 80upx; height: 80upx;"></image>
								</view>
								<view class="ts-column">
									<view class="ts-row ts-h5 ts-text-bold">{{member.name}}</view>
									<view class="ts-row ts-h5">{{member.department}}</view>
								</view>
							</view>
							<view class="ts-row ts-flex-item" style="justify-content: flex-end;">
								<ts-badge type="primary" :text="member.duty"></ts-badge>
							</view>
						</view>
						<view class="ts-gap"></view>
					</block>
				</view>
				<view v-if="currentTab === 3" class="ts-column ts-flex-item">
					<!-- 位置 ,使用v-show会导致地图不显示-->
					<view class="ts-row ts-flex-item">
						<map id="mapid" :latitude="latitude" :longitude="longitude" :show-location="true" :scale="scale" :markers="markers"
						 :style="'width:100%; height:'+heightPx+'px;'">
						</map>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%; height: 100upx;">
		</view>
		<view class="ts-row" style="position: fixed; bottom: 0;left: 0; right: 0; width: 100%; height: 100upx; border-top: #CCCCCC solid 1upx; z-index: 1; background: #FFF;">
			<view class="ts-row ts-flex-item" style="justify-content: center; align-items: center;">
				<text class="ts-row ts-h5">不在活动规定院系</text>
			</view>
			<view class="ts-row ts-flex-item">
				<ts-button type="danger" :height="100">
					<text class="ts-row ts-h4">报名</text>
				</ts-button>
			</view>
		</view>
	</view>
</template>
<script>
	import tsSegmentedControl from '@/components/teaset/components/ts-segmented-control.vue'
	import tsIcon from '@/components/teaset/components/ts-icon.vue'
	import tsButton from '@/components/teaset/components/ts-button.vue'
	import tsBanner from '@/components/teaset/components/ts-banner.vue'
	// 	import marked from '@/components/marked/index.js'
	// 	import wxParse from '@/components/mpvue-wxparse/src/wxParse.vue'
	import tsBadge from '@/components/teaset/components/ts-badge.vue'
	export default {
		components: {
			tsSegmentedControl,
			// wxParse,
			tsIcon,
			tsButton,
			tsBanner,
			tsBadge
		},
		//{"type":"gcj02","latitude":22.902757,"longitude":113.311673,"speed":0,"accuracy":30,"errMsg":"getLocation:ok"} 
		data() {
			return {
				currentTab: 0,
				tabs: ['详情', '信息', '人员', '位置'],
				latitude: 22.902757,
				longitude: 113.311673,
				scale: 18, //地图缩放级别：5-18
				markers: [],
				// 				markers: [{
				// 					latitude: 22.902757,
				// 					longitude: 113.311673,
				// 					iconPath: '/static/location@3x.png'
				// 				}],
				eventInfo: {},
			}
		},
		computed: {
			heightPx() {
				let windowHeight = uni.getSystemInfoSync().windowHeight
				return windowHeight - uni.upx2px(100 + 80 + 400) - 1
			},
			styleString() {
				//需要动态设置，否则当信息未加载的时候会报错
				if (this.eventInfo && this.eventInfo.cover_image) {
					return 'background-image:url(' + this.eventInfo.cover_image + ')background-size: 100% 100%'
				} else {
					return ''
				}
			}
		},
		methods: {
			loadData() {
				uni.request({
					url: this.$API_BASE + `/app/activity/getEventInfo`,
					method: 'GET',
					dataType: 'json',
					data: {
						id: 1,
					},
					success: (response) => {
						uni.stopPullDownRefresh()
						const res = response.data
						if (res.errno === 0) {
							const data = res.data
							if (data) {
								this.eventInfo = data
								const latitude = this.eventInfo.location.latitude
								const longitude = this.eventInfo.location.longitude
								// 								//移动到当前位置
								// 								let mapContext = uni.createMapContext("mapid", this)
								// 								mapContext.moveToLocation({
								// 									latitude: latitude,
								// 									longitude: longitude,
								// 								})
								this.latitude = latitude
								this.longitude = longitude
								this.markers = [{
									latitude: latitude,
									longitude: longitude,
									iconPath: '/static/location@3x.png',

									label: {
										content: this.eventInfo.address,
										color: '#FF0000'
									}
								}]
							}
						} else {
							console.log(res.errmsg)
						}
					}
				})
			}
		},
		onPullDownRefresh() {
			this.loadData()
			// 			setTimeout(function() {
			// 				uni.stopPullDownRefresh()
			// 			}, 1000)
		},

		onLoad() {
			this.loadData()
		},
		// 		onShow() {
		// 			//显示当前位置
		// 			uni.getLocation({
		// 				type: 'gcj02', //返回可以用于uni.openLocation的经纬度
		// 				success: function(res) {
		// 
		// 					console.log(JSON.stringify(res))
		// 					const latitude = res.latitude
		// 					const longitude = res.longitude
		// 
		// 					self.latitude = latitude
		// 					self.longitude = longitude
		// 					self.markers = [{
		// 						latitude: latitude,
		// 						longitude: longitude,
		// 						iconPath: '../../../static/location.png',
		// 
		// 						label: {
		// 							content: '我的位置',
		// 							color: '#FF0000'
		// 						}
		// 					}]
		// 
		// 					//移动到当前位置
		// 					let mapContext = uni.createMapContext("mapid", self)
		// 					mapContext.moveToLocation({
		// 						latitude: latitude,
		// 						longitude: longitude,
		// 					});
		// 
		// 				},
		// 			})
		// 		}
	}
</script>

<style>
	/* @import url('../../../components/mpvue-wxparse/src/wxParse.css'); */

	page {
		font-size: 32upx;
		/* line-height: 1.6; */
	}
	/* page,
	view {
		border: #000000 solid 1px;
	} */

	.ts-gap {
		background-color: #FFFFFF;
	}

	.image-box {
		width: 345upx;
		height: 180upx;
		padding-right: 10upx;
		padding-bottom: 10upx;
	}
</style>
