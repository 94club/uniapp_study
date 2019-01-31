<template>
	<view class="ts-column ts-flex-item">
		<ts-banner :image="project.cover_image" height="250"></ts-banner>
		<view class="ts-column ts-flex-item">
			<view class="section">
				<view class="section-body">
					<view class="section-sub-title">{{project.title}}</view>
					<view class="section-content">{{project.abstract}}</view>
				</view>
			</view>
			<view class="section">
				<view class="section-title">基本信息</view>
				<view class="section-body">
					<view class="section-sub-title">项目介绍</view>
					<view class="section-content">{{project.description}}</view>
					<view class="section-sub-title">项目亮点</view>
					<view class="section-content">{{project.highlights}}</view>
					<view class="section-sub-title">运营数据</view>
					<view class="section-content">
						<view class="ts-row ts-flex-item">
							<view class="ts-column ts-flex-item ts-center">
								<view class="ts-row">10000</view>
								<view class="ts-row">月收入（元）</view>
							</view>
							<view class="ts-column ts-flex-item ts-center">
								<view class="ts-row">10000</view>
								<view class="ts-row">月活总量（人）</view>
							</view>
							<view class="ts-column ts-flex-item ts-center">
								<view class="ts-row">10000</view>
								<view class="ts-row">用户总量（人）</view>
							</view>
						</view>
					</view>
					<view class="section-sub-title">运营数据亮点</view>
					<view class="section-content">{{project.business_data_highlights}}</view>
					<view class="section-sub-title">市场分析</view>
					<view class="section-content">{{project.market_analysis}}</view>
				</view>
			</view>
			<view class="section">
				<view class="section-title">融资信息</view>
				<view class="section-body">
					<view class="section-sub-title" style="justify-content: space-between;">
						<view>融资需求（3人有意向投资）</view>
						<view><button type="warn" size="mini">意向投资</button></view>
					</view>
					<view class="section-content">{{project.financing_demand}}</view>
					<view class="section-sub-title">融资计划</view>
					<view class="section-content">{{project.financing_plan}}</view>
				</view>
			</view>
			<view class="section">
				<view class="section-title">团队信息</view>
				<view class="section-body">
					<view class="section-sub-title">团队特色</view>
					<view class="section-content">{{project.team_characteristics}}</view>
					<view class="section-sub-title" style="justify-content: space-between;">
						<view>团队需要人才（3人有意向参与）</view>
						<view><button type="warn" size="mini">意向参与</button></view>
					</view>
					<view class="section-content">{{project.talent_demand}}</view>
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
							<image v-for="(img,index) in project.images" :key="index" :src="img" style="width: 100%; height: 350upx;"></image>
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
				project: {} //项目信息
			}
		},
		onPullDownRefresh () {
			this.init()
			this.getProjectInfo()
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
			this.getProjectInfo()
		},
		methods: {
			init () {
				this.project = {}
			},
			getProjectInfo () {
				//阻止重复加载网络请求
				if (this.isLoading) {
					uni.stopPullDownRefresh()
					return
				}
				this.isLoading = true
				const api = this.$API_BASE + '/app/syb/getProjectInfo'
				uni.request({
					url: api,
					dataType: 'json',
					method: 'GET',
					data: {
						id: this.id,
					},
					success: (response) => {
						const res = response.data
						this.project = res.data
						//换换购买须知的Markdown文档为HTML代码
						// this.buyerReading = marked(this.project.buyer_reading)
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
