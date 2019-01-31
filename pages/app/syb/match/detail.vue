<template>
	<view class="ts-column ts-flex-item">
		<ts-banner :image="match.cover_image" height="250"></ts-banner>
		<view class="ts-column ts-flex-item">
			<view class="section">
				<view class="section-body">
					<view class="section-sub-title">{{match.title}}</view>
					<view class="section-content">{{match.abstract}}</view>
				</view>
			</view>
			<view class="section">
				<view class="section-title">基本信息</view>
				<view class="section-body">
					<view class="section-sub-title">大赛主题</view>
					<view class="section-content">{{match.topic}}</view>
					<view class="section-sub-title">赛事介绍</view>
					<view class="section-content">{{match.description}}</view>
					<view class="section-sub-title">参赛项目要求</view>
					<view class="section-content">{{match.project_requirements}}</view>
					<view class="section-sub-title">参赛规则</view>
					<view class="section-content">
						<view class="section-content">{{match.rules}}</view>
					</view>
					<view class="section-sub-title">比赛赛制</view>
					<view class="section-content">{{match.format}}</view>
					<view class="section-sub-title">评审规则</view>
					<view class="section-content">{{match.review_rules}}</view>
				</view>
			</view>
			<view class="section">
				<view class="section-title">赛程安排</view>
				<view class="section-body">
					<view class="section-content">{{match.plan}}</view>
				</view>
			</view>
			<view class="section">
				<view class="section-title">大赛奖励</view>
				<view class="section-body">
					<view class="section-content">{{match.awards}}</view>
				</view>
			</view>
			<view class="section">
				<view class="section-title">大赛评委</view>
				<view class="section-body">
					<view class="section-content">
						<view class="ts-column ts-flex-item">
							<block v-for="(item,index) in match.experts" :key="index">
								<view class="ts-row ts-flex-item ts-padding-top">
									<image :src="item.head_image" mode="" style="width: 100upx; height: 100upx; border-radius: 50upx;"></image>
									<view class="ts-column ts-flex-item ts-padding-left">
										<view class="ts-row ts-h5">{{item.name}}</view>
										<view class="ts-row ts-h6">{{item.abstract}}</view>
									</view>
								</view>
							</block>
						</view>
					</view>
				</view>
			</view>
			<navigator url="" hover-class="navigator-hover">
				<view class="ts-row ts-padding" style="justify-content: space-between; align-items: center; background: #FFF;">
					<view class="ts-h4 ts-text-bold">
						参赛团队
					</view>
					<view class="ts-row ts-center">
						<view class="ts-h5">查看团队信息</view>
						<ts-icon type="arrowright" size="32" color="#bbb"></ts-icon>
					</view>
				</view>
			</navigator>
			<view class="section">
				<view class="section-title">大赛结果</view>
				<view class="section-body">
					<view class="section-content">{{match.results}}</view>
				</view>
			</view>
			<view class="section">
				<view class="section-title">附件</view>
				<view class="section-body">
					<view class="section-sub-title">其它附件</view>
					<view class="section-content">
						<view class="">请移步网页版下载</view>
					</view>
					<view class="section-sub-title">图片集</view>
					<view class="section-content">
						<view class="ts-column ts-flex-item">
							<image v-for="(img,index) in match.images" :key="index" :src="img" style="width: 100%; height: 350upx;"></image>
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
				id: 0, // 项目ID
				isLoading: false,
				match: {} // 项目信息
			}
		},
		onPullDownRefresh () {
			this.init()
			this.getMatchInfo()
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
		},
		onUnload () {
			this.isLoading = false
		},
		onLoad (e) {
			this.id = e.id || 0
			this.init()
			this.getMatchInfo()
		},
		methods: {
			init () {
				this.match = {}
			},
			getMatchInfo () {
				//阻止重复加载网络请求
				if (this.isLoading) {
					uni.stopPullDownRefresh()
					return
				}
				this.isLoading = true
				const api = this.$API_BASE + '/app/syb/getMatchInfo'
				uni.request({
					url: api,
					dataType: 'json',
					method: 'GET',
					data: {
						id: this.id,
					},
					success: (response) => {
						const res = response.data
						this.match = res.data
						// 换换购买须知的Markdown文档为HTML代码
						// this.buyerReading = marked(this.match.buyer_reading)
						this.isLoading = false
						// 停止下拉刷新等待的动画
						uni.stopPullDownRefresh()
					}
				})
			}
		}
	}
</script>

<style>
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
		flex-direction: row;
		padding: 10upx 10upx;
		/* line-height: 48upx; */
		font-size: 28upx;
	}
</style>
