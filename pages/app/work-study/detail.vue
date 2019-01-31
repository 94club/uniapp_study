<template>
	<view class="ts-column ts-flex-item">
		<view class="ts-row">
			<view class="ts-column ts-flex-item" style="align-items:flex-start; justify-content: flex-end; height: 400upx;"
			 :style="styleString">
				<view class="ts-column ts-padding">
					<view class="ts-row">
						<text class="ts-row ts-h4 ts-text-bold ts-text-white">{{eventInfo.title}}</text>
					</view>
					<view class="ts-row">
						<text class="ts-row ts-h5 ts-text-white">{{eventInfo.organizer}}</text>
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
									<ts-badge type="warning" :text="eventInfo.type"></ts-badge>
									<ts-badge v-for="(tag,index) in eventInfo.tags" :key="index" type="warning" :text="tag" :padding-left="10"></ts-badge>
								</view>
							</view>
						</view>
						<view class="ts-row ts-flex-item" style="justify-content: flex-end;">
							<!-- <ts-badge type="primary" text="73"></ts-badge> -->
						</view>
					</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h4 ts-text-bold">应聘须知</view>
					<view class="ts-row ts-h5" style="justify-content: space-between;">
						<view class="ts-flex">岗位相关信息及应聘者性别限制</view>
						<view class="ts-flex">
							<ts-badge type="primary" :text="eventInfo.sex"></ts-badge>
						</view>
					</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h5">{{eventInfo.guidelines}}</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h4 ts-text-bold">公司介绍</view>
					<view class="ts-row ts-h5">
						<view class="ts-row">让应聘者进一步了解岗位信息</view>
					</view>
					<view class="ts-gap"></view>
					<view class="ts-column ts-flex-item">
						<view class="image-box" v-for="(img,index) in eventInfo.images" :key="index">
							<image :src="img"></image>
						</view>
					</view>
				</view>
				<view v-show="currentTab === 1" class="ts-column ts-flex-item ts-padding">
					<!-- 信息 -->
					<view class="ts-row ts-h4 ts-text-bold">岗位介绍</view>
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
						<view class="ts-row">开始工作时间</view>
						<view class="ts-row">{{eventInfo.work_time}}</view>
					</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h4 ts-text-bold">联系信息</view>
					<view class="ts-row ts-h5">{{eventInfo.organizer}}</view>
					<view class="ts-row" style="justify-content: space-between;">
						<view class="ts-row ts-h5">联系人:{{eventInfo.linkman}}</view>
						<view class="ts-row ts-h5" @tap="callPhone(eventInfo.contact)">{{eventInfo.contact}}</view>
					</view>
					<view class="ts-row ts-h5">地址:{{eventInfo.address}}</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h4 ts-text-bold">招聘单位性质</view>
					<view class="ts-row ts-h5" style="justify-content: space-between;">
						<view class="ts-row">本次岗位招聘单位的性质</view>
						<view class="ts-row">
							<ts-badge type="danger" :text="eventInfo.type"></ts-badge>
						</view>
					</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h4 ts-text-bold">招聘人数</view>
					<view class="ts-row ts-h5" style="justify-content: space-between;">
						<view class="ts-row">当前岗位招聘人数限制</view>
						<view class="ts-row">
							<ts-badge type="danger" :text="eventInfo.member_max"></ts-badge>
						</view>
					</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h4 ts-text-bold">性别限制</view>
					<view class="ts-row ts-h5" style="justify-content: space-between;">
						<view class="ts-row">当前岗位性别限制</view>
						<view class="ts-row">
							<ts-badge type="danger" :text="eventInfo.sex"></ts-badge>
						</view>
					</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h4 ts-text-bold">薪酬</view>
					<view class="ts-row ts-h5" style="justify-content: space-between;">
						<view class="ts-row ts-h5">工作岗位报酬（以天或者小时计算）</view>
						<view class="ts-row ts-h5">{{eventInfo.salary}}</view>
					</view>
					<view class="ts-row ts-h5">{{eventInfo.salary_description}}</view>
					<view class="ts-gap"></view>
					<view class="ts-row ts-h4 ts-text-bold">标签</view>
					<view class="ts-row ts-h5" style="justify-content: space-between;">
						<view class="ts-row">当前岗位标签</view>
						<view class="ts-row">
							<block v-for="(tag,index) in eventInfo.tags" :key="index">
								<view class="ts-row ts-padding-left">
									<ts-badge type="warning" :text="tag"></ts-badge>
								</view>
							</block>
						</view>
					</view>
					<view class="ts-gap"></view>
				</view>
				<view v-if="currentTab === 2" class="ts-column ts-flex-item">
					<!-- 位置 ,使用v-show会导致地图不显示-->
					<view class="ts-row ts-flex-item">
						<map id="mapid" :latitude="latitude" :longitude="longitude" :show-location="true" :scale="scale" :markers="markers"
						 :controls="true" :style="'width:100%; height:'+heightPx+'px;'">
						</map>
					</view>
				</view>
			</view>
		</view>
		<view style="width: 100%; height: 100upx;"></view>
		<view class="ts-row" style="position: fixed; bottom: 0;left: 0; right: 0; width: 100%; height: 100upx; border-top: #CCCCCC solid 1upx; z-index: 1; background: #FFF;">
			<view class="ts-row ts-flex-item" style="justify-content: center; align-items: center;">
				<text class="ts-row ts-h5">报名已经结束</text>
			</view>
			<view class="ts-row ts-flex-item">
				<ts-button type="danger" :height="100" :disabled="true">
					<text class="ts-row ts-h4">申请岗位</text>
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
	// 	import marked from 'components/marked/index.js'
	// 	import wxParse from 'components/mpvue-wxparse/src/wxParse.vue'
	import tsBadge from '@/components/teaset/components/ts-badge.vue'
	var self
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
		data () {
			return {
				currentTab: 0,
				tabs: ['概况', '详情', '位置'],
				latitude: 22.902757,
				longitude: 113.311673,
				scale: 18, //地图缩放级别：5-18
				markers: [],
				// 				markers: [{
				// 					latitude: 22.902757,
				// 					longitude: 113.311673,
				// 					iconPath: '/static/location@3x.png'
				// 				}],
				eventInfo: {}
			}
		},
		computed: {
			heightPx () {
				let windowHeight = uni.getSystemInfoSync().windowHeight
				return windowHeight - uni.upx2px(100 + 60 + 400) - 1
			},
			styleString () {
				// 需要动态设置，否则当信息未加载的时候会报错
				if (this.eventInfo && this.eventInfo.cover_image) {
					return 'background-image:url(' + this.eventInfo.cover_image + ')background-size: 100% 100%'
				} else {
					return ''
				}
			}
		},
		methods: {
			callPhone (phoneNumber) {
				if (phoneNumber) {
					uni.makePhoneCall({
						phoneNumber: phoneNumber
					})
				}
			},
			loadData () {
				uni.request({
					url: this.$API_BASE + `/app/work-study/getJobInfo`,
					method: 'GET',
					dataType: 'json',
					data: {
						id: 1,
					},
					success: (response) => {
						const res = response.data
						if (res.errno === 0) {
							const data = res.data
							if (data) {
								self.eventInfo = data
								const latitude = self.eventInfo.location.latitude
								const longitude = self.eventInfo.location.longitude
								self.latitude = latitude
								self.longitude = longitude
								self.markers = [{
									latitude: latitude,
									longitude: longitude,
									iconPath: '/static/location@3x.png',
									label: {
										content: self.eventInfo.address,
										color: '#FF0000'
									}
								}]
								//移动到当前位置
								let mapContext = uni.createMapContext("mapid", self)
								mapContext.moveToLocation({
									latitude: latitude,
									longitude: longitude,
								})
							}
						} else {
							console.log(res.errmsg)
						}
					}
				})
			}
		},
		onPullDownRefresh () {
			self.loadData()
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onLoad () {
			self = this
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
		// 					})
		// 
		// 				},
		// 			})
		// 		},
	}
</script>

<style>
	/* @import url('../../../components/mpvue-wxparse/src/wxParse.css'); */


	.ts-gap {
		background-color: #FFFFFF;
	}

	.image-box {
		display: flex;
		flex-direction: column;
		margin-top: 10upx;
	}

	.image-box image {
		width: 100%;
	}
</style>
