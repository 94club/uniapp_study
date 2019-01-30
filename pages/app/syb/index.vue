<template>
	<view class="ts-column  ts-flex-item" style="background: #E0E0E0;">
		<view class="ts-column ts-padding">
			<view class="ts-row" style="background-color: #FFF;">
				<navigator url="/pages/app/syb/company/index" hover-class="navigator-hover" class="ts-flex-item">
					<view class="ts-column ts-flex-item  ts-center ts-padding">
						<text class="ts-h5">进驻企业</text>
						<text class="ts-h5 ts-text-bold">15</text>
					</view>
				</navigator>
				<navigator url="/pages/app/syb/project/index" hover-class="navigator-hover" class="ts-flex-item">
					<view class="ts-column ts-flex-item  ts-center ts-padding">
						<text class="ts-h5">创业项目</text>
						<text class="ts-h5 ts-text-bold">15</text>
					</view>
				</navigator>
				<navigator url="/pages/app/syb/match/index" hover-class="navigator-hover" class="ts-flex-item">
					<view class="ts-column ts-flex-item  ts-center ts-padding">
						<text class="ts-h5">创业大赛</text>
						<text class="ts-h5 ts-text-bold">15</text>
					</view>
				</navigator>
				<navigator url="/pages/app/syb/job/index" hover-class="navigator-hover" class="ts-flex-item">
					<view class="ts-column ts-flex-item  ts-center ts-padding">
						<text class="ts-h5">职位需求</text>
						<text class="ts-h5 ts-text-bold">15</text>
					</view>
				</navigator>
			</view>
		</view>
		<navigator url="match/index" hover-class="navigator-hover">
			<view class="ts-row ts-padding" style="justify-content: space-between; align-items: center; background: #FFF;">
				<view class="ts-h4 ts-text-bold">
					创业大赛
				</view>
				<view class="ts-row ts-center">
					<view class="ts-h5">更多</view>
					<ts-icon type="arrowright" size="32" color="#bbb"></ts-icon>
				</view>
			</view>
		</navigator>
		<block v-for="(item,index) in matchList" :key="index">
			<view class="ts-row ts-padding">
				<view class="ts-column ts-flex-item ts-padding" style="background-color: #FFF;" hover-class="navigator-hover" @tap="matchDetail(item.id)">
					<view class="ts-row">
						<image style="height: 250upx; width: 100%;" :src="item.cover_image"></image>
					</view>
					<view class="ts-row ts-h5 ts-text-bold ts-ellipsis-2 ts-padding-top">{{item.title}}</view>
					<view class="ts-row ts-h5 ts-padding-top">主办方：广州番禺职业技术学院</view>
					<view class="ts-row ts-h5 ts-padding-top">比赛时间：2018年05月10日-2018年06月19日</view>
					<view class="ts-row ts-padding-top" style="justify-content: space-between;">
						<view class="ts-row ts-h5">比赛类型：校内大赛</view>
						<view class="ts-row ts-h5">已有项目：2</view>
					</view>
					<ts-line></ts-line>
					<view class="ts-row" style="justify-content: space-between; align-items: center;">
						<view class="ts-row ts-h5">报名截止时间：2018年06月19日</view>
						<view class="ts-row"><button type="primary" :disabled="true" size="mini">报名结束</button></view>
					</view>
				</view>
			</view>
		</block>
		<navigator url="project/index" hover-class="navigator-hover">
			<view class="ts-row ts-padding" style="justify-content: space-between; align-items: center; background: #FFF;">
				<view class="ts-h4 ts-text-bold">
					创业路
				</view>
				<view class="ts-row ts-center">
					<view class="ts-h5">更多</view>
					<ts-icon type="arrowright" size="32" color="#bbb"></ts-icon>
				</view>
			</view>
		</navigator>
		<block v-for="(item,index) in projectList" :key="index">
			<view class="ts-padding">
				<view class="ts-column ts-padding" hover-class="navigator-hover" style="background-color: #FFF;" @tap="projectDetail(item.id)">
					<view class="ts-row ts-flex-item">
						<image style="width: 200upx; height: 150upx;" :src="item.cover_image"></image>
						<view class="ts-column ts-padding-left ts-padding-right" style="height: 150upx; justify-content: space-between;">
							<view class="ts-column">
								<view class="ts-row ts-h5 ts-ellipsis-2">{{item.title}}</view>
								<view class="ts-row ts-h5">5人意向参与</view>
							</view>
							<view class="ts-row">
								<ts-tag type="danger" text="服务" size="small"></ts-tag>
							</view>
						</view>
					</view>
					<view class="ts-row ts-ellipsis-3 ts-padding-top">
						{{item.abstract}}
					</view>
				</view>
			</view>
		</block>
	</view>
</template>
<script>
	import tsScrollMessage from '@/components/teaset/components/ts-scroll-message.vue'
	export default {
		components: {
			tsScrollMessage
		},
		data () {
			return {
				projectList: [], // 项目列表，只返回3条数据
				matchList: [], // 创业大赛列表，只返回3条记录
				config: {},
				isLoading: false
			}
		},
		methods: {
			init () {
				this.isLoading = false
				this.projectList = []
				this.config = {
					messages: []
				}
				this.matchList = []
			},
			loadAppData () {
				if (this.isLoading == true) {
					return
				}
				this.isLoading = true
				uni.request({
					url: this.$API_BASE + `/app/syb/getAppInfo`,
					method: 'GET',
					dataType: 'json',
					data: {},
					success: (response) => {
						const res = response.data
						if (res.errno===0) {
							const data = res.data
							if (data) {
								this.projectList = data.projects
								this.matchList = data.matches
								this.config = data.config
							}
							this.isLoading = false
						} else {
							console.log(res.errmsg)
						}
					}
				})
			},
			projectDetail (id) {
				uni.navigateTo({
					url: `project/detail?id=${id}`
				})
			},
			matchDetail (id) {
				uni.navigateTo({
					url: `match/detail?id=${id}`
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
			setTimeout(() =>{
        uni.stopPullDownRefresh()
      }, 1000)
		}
	}
</script>
