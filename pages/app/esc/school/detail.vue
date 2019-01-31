<template>
	<view class="ts-column ts-flex-item">
		<ts-banner :image="detail.cover_image" height="250"></ts-banner>
		<view class="section">
			<view class="section-body" hover-class="navigator-hover">
				<view class="section-content">
					<view class="ts-column ts-flex-item">
						<view class="ts-column ts-center">
							<view class="ts-row ts-h4  ts-padding-top ts-text-bold">{{detail.title}}</view>
							<view class="ts-row ts-padding-top">
								<view class="ts-row ts-h5">{{detail.city}}</view>
								<view class="ts-row ts-padding-left">
									<ts-tag :text="detail.type" size="small" type="danger"></ts-tag>
								</view>
							</view>
						</view>
						<ts-line></ts-line>
						<view class="ts-row ts-padding-top">
							<view v-for="(tag,idx) of detail.tags" :key="idx" class="ts-row ts-padding-right">
								<ts-tag :text="tag" size="small" type="primary"></ts-tag>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="section">
			<view class="section-title">学校简介</view>
			<view class="section-body">
				<view class="section-content">
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
		</view>
		<view class="section">
			<view class="section-title">学校地址</view>
			<view class="section-body">
				<view class="section-content">{{detail.address}}</view>
			</view>
		</view>
		<view class="section">
			<view class="section-title">发布的人才信息</view>
			<view class="section-body">
				<ts-search-bar v-model="keywords" @search="doSearch"></ts-search-bar>
				<block v-for="(item,index) in searchResult" :key="index">
					<view class="ts-column  ts-flex-item  ts-padding" hover-class="navigator-hover" style="background-color: #FFF;"
					 @tap="showDetail(item.id)">
						<view class="ts-row ts-flex-item">
							<image style="width: 100upx; height: 100upx;" :src="item.cover_image"></image>
							<view class="ts-column ts-flex-item ts-padding-left ts-padding-right" style="height: 200upx; justify-content: space-between;">
								<view class="ts-row ts-h5 ts-ellipsis-2">{{item.title}}</view>
								<view class="ts-column">
									<view class="ts-row ts-h5 ts-ellipsis ts-padding-top">{{item.school_name}}</view>
									<view class="ts-row ts-h5  ts-padding-top">{{item.major}}</view>
									<view class="ts-row  ts-padding-top ts-padding-bottom">
										<view class="ts-padding-right" v-for="(tag,idx) in item.tags" :key="idx">
											<ts-tag type="danger" :text="tag" size="small"></ts-tag>
										</view>
									</view>
								</view>
							</view>
						</view>
						<ts-line />
						<view class="ts-row ts-ellipsis-3 ts-padding-top">
							{{item.abstract}}
						</view>
					</view>
					<view class="ts-gap"></view>
				</block>
			</view>
		</view>
		<view class="ts-column">
			<ts-load-more :loadingType="loadingType" @tap="loadMoreSearchResult"></ts-load-more>
		</view>
	</view>
</template>
<script>
	// import tsBanner from 'components/teaset/components/ts-banner.vue';
	import marked from '@/components/marked/index.js'
	//#ifndef H5
	import wxParse from '@/components/mpvue-wxparse/src/wxParse.vue'
	//#endif
	export default {
		components: {
			// tsBanner,
			//#ifndef H5
			wxParse,
			//#endif
		},
		data () {
			return {
				id: 0, //项目ID
				isLoading: false,
				detail: {}, //项目信息
				description: '',
				imageProp: {
					// mode:'aspectFill',
					// domain:'http://d1.hucdn.com',
					// domain:''
				},
				keywords: '',
				searchResult: [],
				loadingType: 0, //上拉的状态：0-loading前；1-loading中；2-没有更多了
				page: 0
			}
		},
		onPullDownRefresh () {
			this.detail = {}
			this.getDetailInfo()
			this.doSearch()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onUnload () {
			this.isLoading = false
		},
		onLoad (e) {
			this.id = e.id || 0
			this.detail = {}
			this.getDetailInfo()
			this.doSearch()
		},
		onReachBottom () {
			this.loadMoreSearchResult()
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
			showDetail (id) {
				uni.navigateTo({
					url: `/pages/app/esc/job/supply/detail?id=${id}`,
				})
			},
			init () {
				this.searchResult = []
				this.page = 0
				this.loadingType = 0
			},
			doSearch () {
				this.init()
				this.loadMoreSearchResult()
			},
			loadMoreSearchResult () {
				//上拉的状态：0-loading前；1-loading中；2-没有更多了
				if (this.loadingType !== 0) {
					return
				}
				this.loadingType = 1
				this.page = this.page + 1
				uni.request({
					url: this.$API_BASE + `/app/esc/searchJobSupply`,
					method: 'GET',
					dataType: 'json',
					data: {
						page: this.page, //分页代码
						key: this.keywords, //关键字
						school_id: this.id, //限定的学校
					},
					success: (response) => {
						const res = response.data
						if (res.errno===0) {
							const data = res.data
							if (data && data.data) {
								this.searchResult = this.searchResult.concat(data.data)
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
			getDetailInfo () {
				// 阻止重复加载网络请求
				if (this.isLoading) {
					uni.stopPullDownRefresh()
					return
				}
				this.isLoading = true
				const api = this.$API_BASE + '/app/esc/getSchoolInfo'
				uni.request({
					url: api,
					dataType: 'json',
					method: 'GET',
					data: {
						id: this.id,
					},
					success: (response) => {
						const res = response.data
						this.detail = res.data
						console.log(this.detail.description)
						// this.description = this.detail.description
						this.description = marked(this.detail.description)
						this.isLoading = false
					},
					fail () {
						this.isLoading = false
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
		/* padding: 10upx 10upx; */
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
		flex-direction: row;
		padding: 20upx;
		/* line-height: 48upx; */
		font-size: 28upx;
	}
</style>
