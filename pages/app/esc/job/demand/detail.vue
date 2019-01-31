<template>
	<view class="ts-column ts-flex-item">
		<view class="ts-column ts-flex-item">
			<view class="section">
				<view class="ts-row ts-padding" style="justify-content: space-between; align-items: center; background-color: #FFF;">
					<view class="ts-row ts-h4 ts-text-bold">{{job.title}}</view>
					<view class="ts-row ts-h5">{{job.salary}}</view>
				</view>
				<view class="section-body">
					<view class="section-content">

						<view class="ts-column ts-flex-item">
							<view class="ts-row" style="justify-content:space-between;">
								<view class="ts-row ts-flex-item ts-padding-top">
									<view class="ts-row ">
										<ts-tag type="warning" :text="job.diplomas" size="small"></ts-tag>
									</view>
									<view class="ts-row ts-padding-left">
										<ts-tag type="danger" :text="job.working_years" size="small"></ts-tag>
									</view>
									<view class="ts-row ts-padding-left">
										<ts-tag type="danger" :inverted="true" :text="job.type" size="small"></ts-tag>
									</view>
								</view>
								<view class="ts-row ts-h5">
									{{job.date}}
								</view>
							</view>
							<view class="ts-row ts-padding-top ts-center" style="justify-content:space-between;">
								<view class="ts-row ts-flex-item">
									<view v-for="(item,index) of job.welfare" :key="index" class="ts-row ts-padding-right">
										<ts-tag :text="item" size="small"></ts-tag>
									</view>
								</view>
								<!-- #ifdef APP-PLUS -->
								<view class="ts-row ">
									<button type="warn" size="mini" :data-value="job" @tap="share">分享</button>
								</view>
								<!-- #endif -->
								<!-- #ifdef MP-WEIXIN -->
								<view class="ts-row ">
									<button size="mini" type="warn" open-type="share" :data-value="job">分享</button>
								</view>
								<!-- #endif -->
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="section">
				<view class="section-title">公司</view>
				<navigator :url="'/pages/app/esc/company/detail?id='+job.company_id" hover-class="navigator-hover">
					<view class="section-body ">
						<view class="section-content">
							<view class="ts-row ts-flex-item">
								<image style="width: 200upx; height: 150upx;" :src="job.cover_image"></image>
								<view class="ts-row ts-flex-item ts-padding-left ts-padding-right" style="height: 150upx; justify-content: space-between;">
									<view class="ts-row ts-flex-item">
										<view class="ts-column">
											<view class="ts-row ts-h5">{{job.company}}</view>
											<view class="ts-row ts-h5">{{job.company_scale}}</view>
										</view>
									</view>
									<view class="ts-row" style="align-items: center;">
										<ts-icon type="arrowright" color="#000"></ts-icon>
									</view>
								</view>
							</view>
						</view>
					</view>
				</navigator>
			</view>
			<view class="section">
				<view class="section-title">岗位职责</view>
				<view class="section-body">
					<view class="section-content">{{job.responsibilities}}</view>
				</view>
			</view>
			<view class="section">
				<view class="section-title">责任要求</view>
				<view class="section-body">
					<view class="section-content">{{job.job_requirements}}</view>
				</view>
			</view>
			<view class="section">
				<view class="section-title">工作地点</view>
				<view class="section-body">
					<view class="section-content">{{job.address}}</view>
				</view>
			</view>
			<view class="section">
				<view class="section-title">图片集</view>
				<view class="section-body">
					<view class="section-content">
						<view class="ts-column ts-flex-item">
							<image v-for="(img,index) in job.images" :key="index" :src="img" style="width: 100%; height: 350upx;"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import tsBanner from '@/components/teaset/components/ts-banner.vue'
	export default {
		components: {
			tsBanner
		},
		data () {
			return {
				id: 0, //项目ID
				isLoading: false,
				job: {}, //项目信息，
				providerList: []
			}
		},
		onPullDownRefresh () {
			this.init()
			this.getJobInfo()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onUnload () {
			this.isLoading = false
		},
		onLoad (e) {
			this.id = e.id || 0
			this.init()
			this.getJobInfo()
			//获取分享通道
			uni.getProvider({
				service: 'share',
				success: (e) => {
					let data = []
					// console.log(JSON.stringify(e.provider))
					for (let i = 0; i < e.provider.length; i++) {
						//["sinaweibo","tencentweibo","qq","weixin"]
						switch (e.provider[i]) {
							case 'weixin':
								data.push({
									name: '分享到微信好友',
									id: 'weixin'
								})
								data.push({
									name: '分享到微信朋友圈',
									id: 'weixin',
									type: 'WXSenceTimeline'
								})
								break
							case 'qq':
								data.push({
									name: '分享到QQ',
									id: 'qq'
								})
								break
							case 'sinaweibo':
								data.push({
									name: '新浪微博',
									id: 'sinaweibo'
								})
								break
							default:
								break
						}
					}
					this.providerList = data
				},
				fail: (e) => {
					console.log('获取登录通道失败:' + JSON.stringify(e))
				}
			})
		},
		// #ifdef MP-WEIXIN
		//分享按钮函数
		onShareAppMessage (options) {
			if (options.from === 'button') {
				// 来自页面内转发按钮
				// console.log('target:' + JSON.stringify(options.target))
				let value = options.target.dataset.value
				// 				console.log('value:' + JSON.stringify(value))
				// 				console.log('img:' + JSON.stringify(value.img))
				let api = `http://beidian.zengqs.com`
				return {
					title: value.title,
					// desc: value.desc,
					path: api,
					imageUrl: value.cover_image,
					success: function(res) {
						// 转发成功
						console.log("转发成功:" + JSON.stringify(res))
					},
					fail: function(res) {
						// 转发失败
						console.log("转发失败:" + JSON.stringify(res))
					}
				}
			} else {

				return {
					title: 'XXX小程序',
					desc: '最具人气的小程序开发联盟!',
					path: 'pages/index/index',
					// imageUrl: "/images/1.jpg",
					success: function(res) {
						// 转发成功
						console.log("转发成功:" + JSON.stringify(res))
					},
					fail: function(res) {
						// 转发失败
						console.log("转发失败:" + JSON.stringify(res))
					}
				}
			}
		},
		// #endif
		methods: {
			// #ifdef APP-PLUS
			share (e) {
				const item = e.target.dataset['value']
				console.log(JSON.stringify(item))
				// console.log(JSON.stringify(e))
				let api = `http://beidian.zengqs.com`

				if (this.providerList.length === 0) {
					uni.showModal({
						title: '当前环境无分享渠道!',
						showCancel: false
					})
					return
				}
				let itemList = this.providerList.map(function(value) {
					return value.name
				})
				uni.showActionSheet({
					itemList: itemList,
					success: (res) => {
						uni.share({
							provider: this.providerList[res.tapIndex].id,
							scene: this.providerList[res.tapIndex].type && this.providerList[res.tapIndex].type ===
								'WXSenceTimeline' ?
								'WXSenceTimeline' : "WXSceneSession",
							type: 0,
							title: item.title,
							summary: item.company,
							imageUrl: item.cover_image,
							href: api,
							success: (res) => {
								console.log("success:" + JSON.stringify(res))
							},
							fail: (e) => {
								uni.showModal({
									content: e.errMsg,
									showCancel: false
								})
							}
						})
					}
				})
			},
			// #endif
			init() {
				this.job = {}
			},
			getJobInfo() { //获取岗位信息
				//阻止重复加载网络请求
				if (this.isLoading) {
					// uni.stopPullDownRefresh()
					return
				}
				this.isLoading = true
				const api = this.$API_BASE + '/app/esc/getJobDemandInfo'
				uni.request({
						url: api,
						dataType: 'json',
						method: 'GET',
						data: {
							id: this.id,
						},
						success: (response) => {
							const res = response.data
							this.job = res.data
							this.isLoading = false
							//停止下拉刷新等待的动画
							uni.stopPullDownRefresh()
						},
						fail() {
							//不论成败，都要停止下拉刷新的动画
							uni.stopPullDownRefresh()
						}
					}
				)
			}
		}
	}
</script>

<style>
	@import url('../../../../../components/mpvue-wxparse/src/wxParse.css');
	/* view {
		display: block;
	} */
	.section {
		display: flex;
		flex-direction: column;
		background: #E0E0E0;
		padding-bottom: 20upx;
	}
	.section:last-child {
		padding-bottom: 0upx;
	}
	.section-title {
		display: flex;
		flex-direction: row;
		background: #BBBBBB;
		height: 60upx;
		font-size: 32upx;
		line-height: 60upx;
		padding: 10upx;
		font-weight: bold;
		border-left: #FF6600 solid 10upx;
	}
	.section-body {
		padding: 10upx 10upx;
		background: #FFF;
		display: flex;
		font-size: 28upx;
		flex-direction: column;
	}
	.section-sub-title {
		display: flex;
		flex-direction: row;
		flex: 1;
		border-bottom: #E0E0E0 solid 1upx;
		font-size: 32upx;
		height: 52upx;
		line-height: 52upx;
		padding: 10upx 10upx;
		font-weight: bold;
	}
	.section-content {
		display: flex;
		flex-direction: column;
		padding: 10upx 10upx;
		font-size: 28upx;
	}
</style>
