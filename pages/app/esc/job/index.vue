<template>
	<view class="ts-column  ts-flex-item" style="background: #E0E0E0;">
		<ts-banner :image="config.cover_image" height="250"></ts-banner>
		<view class="ts-column ts-padding">
			<view class="ts-row" style="background-color: #FFF;">
				<navigator url="demand/index" hover-class="navigator-hover" class="ts-flex-item">
					<view class="ts-column ts-flex-item  ts-center ts-padding">
						<text class="ts-h5">人才需求</text>
						<text class="ts-h5 ts-text-bold">15</text>
					</view>
				</navigator>
				<navigator url="supply/index" hover-class="navigator-hover" class="ts-flex-item">
					<view class="ts-column ts-flex-item  ts-center ts-padding">
						<text class="ts-h5">人才供给</text>
						<text class="ts-h5 ts-text-bold">15</text>
					</view>
				</navigator>
			</view>
		</view>
		<navigator url="demand/index" hover-class="navigator-hover">
			<view class="ts-row ts-padding" style="justify-content: space-between; align-items: center; background: #FFF;">
				<view class="ts-h4 ts-text-bold">
					企业用人需求
				</view>
				<view class="ts-row ts-center">
					<view class="ts-h5">更多</view>
					<ts-icon type="arrowright" size="32" color="#bbb"></ts-icon>
				</view>
			</view>
		</navigator>
		<view class="ts-background-white">
			<ts-line></ts-line>
		</view>
		<block v-for="(item,index) in demands" :key="index">
			<view class="ts-column ts-flex-item ts-padding" hover-class="navigator-hover" @tap="demandDetail(item.id)" style="background: #FFF;">
				<view class="ts-row ts-flex-item">
					<image style="width: 100upx; height: 100upx;" :src="item.cover_image"></image>
					<view class="ts-column ts-flex-item ts-padding-left ts-padding-right" style="height: 200upx; justify-content: space-between;">
						<view class="ts-column">
							<view class="ts-row" style="justify-content:space-between;">
								<view class="ts-row ts-h5 ts-text-bold ts-ellipsis-2">{{item.title}}</view>
								<view class="ts-h5 ts-padding-left" style="width: 100upx; justify-content: flex-end;">{{item.salary}}</view>
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
		<navigator url="supply/index" hover-class="navigator-hover">
			<view class="ts-row ts-padding" style="justify-content: space-between; align-items: center; background: #FFF;">
				<view class="ts-h4 ts-text-bold">
					高校人才供应
				</view>
				<view class="ts-row ts-center">
					<view class="ts-h5">更多</view>
					<ts-icon type="arrowright" size="32" color="#bbb"></ts-icon>
				</view>
			</view>
		</navigator>
		<block v-for="(item,index) in supplies" :key="index">
			<view class="ts-padding">
				<view class="ts-column  ts-flex-item  ts-padding" hover-class="navigator-hover" style="background-color: #FFF;"
				 @tap="supplyDetail(item.id)">
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
			</view>
		</block>
	</view>
</template>
<script>
	export default {
		components: {
		},
		data () {
			return {
				demands: [], //项目列表，只返回3条数据
				supplies: [], //创业大赛列表，只返回3条记录
				config: {},
				isLoading: false
			}
		},
		methods: {
			init () {
				this.isLoading = false
				this.demands = []
				this.config = {
					messages: []
				}
				this.supplies = []
			},
			loadAppData () {
				if (this.isLoading == true) {
					return
				}
				this.isLoading = true
				uni.request({
					url: this.$API_BASE + `/app/esc/getAppInfo`,
					method: 'GET',
					dataType: 'json',
					data: {},
					success: (response) => {
						const res = response.data
						if (res.errno===0) {
							const data = res.data
							if (data) {
								this.demands = data.demands
								this.supplies = data.supplies
								this.config = data.config
							}
							this.isLoading = false
						} else {
							console.log(res.errmsg)
						}
					}
				})
			},
			supplyDetail(id) {
				uni.navigateTo({
					url: `supply/detail?id=${id}`,
				})
			},
			demandDetail(id) {
				uni.navigateTo({
					url: `demand/detail?id=${id}`,
				})
			}
		},
		onLoad () {
			this.init()
			this.loadAppData()
		},
		onUnload () {
			this.isLoading = false
		},
		onPullDownRefresh () {
			this.init()
			this.loadAppData()
			setTimeout(() =>
				uni.stopPullDownRefresh(), 1000)
		}
	}
</script>

<style>
</style>
