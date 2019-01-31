<template>
	<view class="ts-column ts-flex-item">
		<!-- <ts-banner :image="job.cover_image" height="250"></ts-banner> -->
		<view class="ts-column ts-flex-item">
			<view class="section">
				<view class="ts-padding" style="justify-content: space-between; align-items: center; background-color: #FFF;">
					<view class="ts-h4 ts-text-bold">{{job.title}}</view>
					<view class="ts-h5">{{job.salary}}</view>
				</view>
				<view class="section-body">
					<view class="section-content">
						<view class="ts-column ts-flex-item">
							<view class="ts-row" style="justify-content:space-between;">
								<view class="ts-row">
									<view class="ts-padding-right ts-h5">{{job.city}}</view>
									<view class="ts-padding-right ts-h5">{{job.diplomas}}</view>
									<view class="ts-h5">{{job.working_years}}</view>
								</view>
								<view class="ts-h5">
									{{job.date}}
								</view>
							</view>
							<view class="ts-padding-top">
								<view v-for="(item,index) of job.welfare" :key="index" class="ts-padding-right">
									<ts-tag :text="item" size="small"></ts-tag>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="section">
				<view class="section-title">公司</view>
				<view class="section-body " hover-class="navigator-hover">
					<view class="section-content">
						<view class="ts-row ts-flex-item">
							<image style="width: 200upx; height: 150upx;" :src="job.cover_image"></image>
							<view class="ts-row ts-flex-item ts-padding-left ts-padding-right" style="height: 150upx; justify-content: space-between;">
								<view class="ts-flex-item">
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
				id: 0, // 项目ID
				isLoading: false,
				job: {} // 项目信息
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
		},
		methods: {
			init () {
				this.job = {}
			},
			getJobInfo () {
				// 阻止重复加载网络请求
				if (this.isLoading) {
					uni.stopPullDownRefresh()
					return
				}
				this.isLoading = true
				const api = this.$API_BASE + '/app/syb/getJobInfo'
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
						// 换换购买须知的Markdown文档为HTML代码
						// this.buyerReading = marked(this.job.buyer_reading)
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
