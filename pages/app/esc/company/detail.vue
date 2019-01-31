<template>
	<view class="ts-column ts-flex-item">
		<view class="section">
			<view class="section-body" hover-class="navigator-hover">
				<view class="section-content">
					<view class="ts-column ts-flex-item">
						<view class="ts-column ts-center">
							<image style="width: 200upx; height: 200upx; border-radius: 200upx;" :src="company.cover_image"></image>
							<view class="ts-column  ts-padding-top ts-center">
								<view class="ts-row ts-h4  ts-padding-top ts-text-bold">{{company.title}}</view>
								<view class="ts-row ts-h5  ts-padding-top" v-if="!!company.company_abbreviate">简称:{{company.company_abbreviate}}</view>
							</view>
							<view class="ts-row ts-padding-top">
								<view class="ts-row ts-h5">{{company.city}}</view>
								<view class="ts-row ts-h5 ts-padding-left">{{company.type}}</view>
							</view>
							<view class="ts-row  ts-padding-top">
								<view class="ts-row ts-h5">{{company.company_scale}}</view>
								<view class="ts-row ts-h5 ts-padding-left" v-if="!!company.tag">
									<ts-tag :text="company.tag" size="small" type="danger" :inverted="true"></ts-tag>
								</view>
							</view>
						</view>
						<ts-line></ts-line>
						<view class="ts-row ts-padding-top">
							<view v-for="(item,index) of company.welfare" :key="index" class="ts-row ts-padding-right">
								<ts-tag :text="item" size="small"></ts-tag>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="section">
			<view class="section-title">公司简介</view>
			<view class="section-body">
				<!-- #ifdef MP-WEIXIN -->
				<wxParse :content="description" @preview="preview" @navigate="navigate" />
				<!-- #endif -->
				<!-- #ifdef APP-PLUS -->
				<wxParse :content="description" @preview="preview" @navigate="navigate" />
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<rich-text :nodes="description"></rich-text>
				<!-- #endif -->
			</view>
		</view>
		<view class="section">
			<view class="section-title">公司地址</view>
			<view class="section-body">
				<view class="section-content">{{company.address}}</view>
			</view>
		</view>
		<view class="section">
			<view class="section-title">发布的职位</view>
			<view class="section-body">
				<block v-for="(item,index) in jobs" :key="index">
					<view class="ts-column ts-flex-item ts-padding" hover-class="navigator-hover" @tap="detail(item.id)">
						<view class="ts-row ts-flex-item">
							<image style="width: 100upx; height: 100upx;" :src="item.cover_image"></image>
							<view class="ts-column ts-flex-item ts-padding-left ts-padding-right" style="height: 200upx; justify-content: space-between;">
								<view class="ts-column">
									<view class="ts-row" style="justify-content:space-between;">
										<view class="ts-row ts-h5 ts-text-bold ts-ellipsis-2">{{item.title}}</view>
										<view class="ts-row ts-h5 ts-padding-left" style="width: 100upx; justify-content: flex-end;">{{item.salary}}</view>
									</view>
								</view>
								<view class="ts-column">
									<view class="ts-row ts-h5 ts-ellipsis  ts-padding-top">{{item.company}}</view>
									<view class="ts-row ts-padding-top">
										<view class="">
											<ts-tag type="warning" :text="item.diplomas" size="small"></ts-tag>
										</view>
										<view class="ts-padding-left">
											<ts-tag type="danger" :text="item.working_years" size="small"></ts-tag>
										</view>
										<view class="ts-padding-left">
											<ts-tag type="danger" :inverted="true" :text="item.type" size="small"></ts-tag>
										</view>
									</view>
									<view class="ts-row ts-padding-top" style="justify-content:space-between;">
										<view class="ts-row">
											<view class="ts-padding-right ts-h5">{{item.city}}</view>
										</view>
										<view class="ts-h5">
											{{item.date}}
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="ts-gap"></view>
				</block>
			</view>
		</view>
		<view class="ts-column">
			<ts-load-more :loadingType="loadingType" @tap="loadMoreJobs"></ts-load-more>
		</view>
	</view>
</template>

<script>
	import tsBanner from '@/components/teaset/components/ts-banner.vue'
	import marked from '@/components/marked/index.js'
	import wxParse from '@/components/mpvue-wxparse/src/wxParse.vue'
	export default {
		components: {
			tsBanner,
			wxParse
		},
		data () {
			return {
				id: 0, //项目ID
				isLoading: false,
				company: {}, //项目信息
				jobs: [],
				loadingType: 0, //上拉的状态：0-loading前；1-loading中；2-没有更多了
				page: 0,
				demands: [], //已经发布的岗位需求
				description: '',
				imageProp: {
					// mode:'aspectFill',
					// domain:'http://d1.hucdn.com',
					// domain:''
				},
			}
		},
		onPullDownRefresh () {
			this.init()
			this.getCompanyInfo()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onUnload () {
			this.isLoading = false
		},
		onLoad (e) {
			console.log(JSON.stringify(e))
			this.id = e.id || 0
			this.init()
			this.getCompanyInfo()
			if (this.id > 0) {
				this.loadMoreJobs()
			}
		},
		onReachBottom: function() {
			this.loadMoreJobs()
		},
		methods: {
			preview (src, e) {
				//图片浏览功能
				console.log('src: ' + src)
			},
			navigate (href, e) {
				//打开链接
				//#ifdef APP-PLUS
				plus.runtime.openURL(href)
				//#endif
				//小程序不支持打开外链
				//#ifdef MP-WEIXIN
				uni.setClipboardData({
					data: href
				})
				//#endif
			},
			init () {
				this.company = {}
				this.jobs = []
				this.page = 0
				this.loadingType = 0
			},
			loadMoreJobs () {
				//上拉的状态：0-loading前；1-loading中；2-没有更多了
				if (this.loadingType !== 0) {
					return
				}
				this.loadingType = 1
				this.page = this.page + 1
				uni.request({
					url: this.$API_BASE + `/app/esc/searchJobDemand`,
					method: 'GET',
					dataType: 'json',
					data: {
						page: this.page,
						company_id: this.id, //检索指定的公司的发布的职位信息
					},
					success: (response) => {
						const res = response.data
						if (res.errno===0) {
							const data = res.data
							if (data && data.data) {
								this.jobs = this.jobs.concat(data.data)
							}
								if (data.totalPages === data.currentPage) {
								this.loadingType = 2 //2-没有更多了
							} else {
								this.loadingType = 0 //开启新一轮加载
							}
						} else {
							console.log(res.errmsg)
						}
					}
				})
			},
			detail (id) {
				uni.navigateTo({
					url: `../job/demand/detail?id=${id}`,
				})
			},
			getCompanyInfo () {
				//阻止重复加载网络请求
				if (this.isLoading) {
					uni.stopPullDownRefresh()
					return
				}
				this.isLoading = true
				const api = this.$API_BASE + '/app/esc/getCompanyInfo'
				uni.request({
					url: api,
					dataType: 'json',
					method: 'GET',
					data: {
						id: this.id,
					},
					success: (response) => {
						const res = response.data
						this.company = res.data
						//Markdown文档为HTML代码
						this.description = marked(this.company.description)
						this.isLoading = false
						//停止下拉刷新等待的动画
						uni.stopPullDownRefresh()
					}
				})
			}
		}
	}
</script>
<style>
	@import url('../../../../components/mpvue-wxparse/src/wxParse.css');

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
		/* line-height: 48upx; */
		font-size: 28upx;
	}
</style>
