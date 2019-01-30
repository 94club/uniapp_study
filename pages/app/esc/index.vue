<template>
	<view class="ts-column  ts-flex-item" style="background: #E0E0E0;">
		<!-- 弹出窗口 -->
		<ts-popup v-model="hidden">
			<view id="popup" class="ts-column">
				<view class="ts-list">
					<block v-if="role==='student'">
						<view class="ts-list-cell">
							<view class="ts-list-cell-navigate ts-navigate-right ts-navigate-badge">
								分享记录
								<ts-badge :inverted="true" type="danger" text="我的分享记录"></ts-badge>
							</view>
						</view>
						<view class="ts-list-cell">
							<view class="ts-list-cell-navigate ts-navigate-right ts-navigate-badge">
								佣金明细
								<ts-badge :inverted="true" type="danger" text="推广提成明细"></ts-badge>
							</view>
						</view>
						<view class="ts-list-cell" hover-class="navigator-hover" @tap="navigateTo('student/resume')">
							<view class="ts-list-cell-navigate ts-navigate-right ts-navigate-badge">
								我的简历
								<ts-badge :inverted="true" type="danger" text="我发布的求职简历"></ts-badge>
							</view>
						</view>
					</block>
					<block v-if="role==='school'">
						<view class="ts-list-cell">
							<view class="ts-list-cell-navigate ts-navigate-right ts-navigate-badge">
								人才信息
								<ts-badge :inverted="true" type="danger" text="我发布的人才信息"></ts-badge>
							</view>
						</view>
						<view class="ts-list-cell">
							<view class="ts-list-cell-navigate ts-navigate-right ts-navigate-badge">
								招聘信息
								<ts-badge :inverted="true" type="danger" text="企业发过来的招聘信息"></ts-badge>
							</view>
						</view>
						<view class="ts-list-cell">
							<view class="ts-list-cell-navigate ts-navigate-right ts-navigate-badge">
								我的学校
								<ts-badge :inverted="true" type="danger" text="学校信息"></ts-badge>
							</view>
						</view>
					</block>
					<block v-if="role==='company'">
						<view class="ts-list-cell">
							<view class="ts-list-cell-navigate ts-navigate-right ts-navigate-badge">
								岗位应聘信息
								<ts-badge :inverted="true" type="danger" text="收到的求职简历"></ts-badge>
							</view>
						</view>
						<view class="ts-list-cell">
							<view class="ts-list-cell-navigate ts-navigate-right ts-navigate-badge">
								我的企业
								<ts-badge :inverted="true" type="danger" text="企业信息"></ts-badge>
							</view>
						</view>
					</block>
				</view>
				<view class="ts-grid-9">
					<!-- 根据不同的角色显示发布界面 -->
					<block v-if="role==='company'">
						<view class="ts-grid-9-item" hover-class="ts-grid-9-item-hover" @tap="navigateTo('company/add')">
							<ts-icon type="plus" size="80" color="#d81e06"></ts-icon>
							<text class="ts-grid-9-text ts-padding">发布</text>
						</view>
					</block>
					<block v-if="role==='school'">
						<view class="ts-grid-9-item" hover-class="ts-grid-9-item-hover" @tap="navigateTo('school/add')">
							<ts-icon type="plus" size="80" color="#d81e06"></ts-icon>
							<text class="ts-grid-9-text ts-padding">发布</text>
						</view>
					</block>
					<block v-if="role==='student'">
						<view class="ts-grid-9-item" hover-class="ts-grid-9-item-hover" @tap="navigateTo('student/add')">
							<ts-icon type="plus" size="80" color="#d81e06"></ts-icon>
							<text class="ts-grid-9-text ts-padding">发布</text>
						</view>
						<view class="ts-grid-9-item" hover-class="ts-grid-9-item-hover" @tap="navigateTo('student/index')">
							<ts-icon type="person" size="80" color="#d81e06"></ts-icon>
							<text class="ts-grid-9-text ts-padding">我的</text>
						</view>
						<view class="ts-grid-9-item" hover-class="ts-grid-9-item-hover" @tap="navigateTo('my')">
							<ts-icon type="paperclip" size="80" color="#d81e06"></ts-icon>
							<text class="ts-grid-9-text ts-padding">收藏夹</text>
						</view>
					</block>
				</view>
				<button type="warn" style="width: 100%; background-color: #e31436; 	border-radius: 0upx; height: 100upx;" @tap="hide">关闭</button>
			</view>
		</ts-popup>
		<view class="ts-fab" @tap="showPopupWindow">
			<image src="../../../static/plus.png" />
			<text v-show="messageCount > 0" class="ts-badge ts-badge-danger">{{messageCount}}</text>
		</view>
		<view class="ts-column ts-padding">
			<view class="ts-row" style="background-color: #FFF;">
				<navigator url="/pages/app/esc/company/index" hover-class="navigator-hover" class="ts-flex-item">
					<view class="ts-column ts-flex-item  ts-center ts-padding">
						<text class="ts-h5">合作企业</text>
						<text class="ts-h5 ts-text-bold">15</text>
					</view>
				</navigator>
				<navigator url="/pages/app/esc/school/index" hover-class="navigator-hover" class="ts-flex-item">
					<view class="ts-column ts-flex-item  ts-center ts-padding">
						<text class="ts-h5">合作高校</text>
						<text class="ts-h5 ts-text-bold">15</text>
					</view>
				</navigator>
				<navigator url="/pages/app/esc/project/index" hover-class="navigator-hover" class="ts-flex-item">
					<view class="ts-column ts-flex-item  ts-center ts-padding">
						<text class="ts-h5">合作项目</text>
						<text class="ts-h5 ts-text-bold">15</text>
					</view>
				</navigator>
				<navigator url="/pages/app/esc/job/index" hover-class="navigator-hover" class="ts-flex-item">
					<view class="ts-column ts-flex-item  ts-center ts-padding">
						<text class="ts-h5">人才供需</text>
						<text class="ts-h5 ts-text-bold">15</text>
					</view>
				</navigator>
			</view>
		</view>
		<navigator url="job/demand/index" hover-class="navigator-hover">
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
		<block v-for="(item, index) in demands" :key="index">
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
		<navigator url="job/supply/index" hover-class="navigator-hover">
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
		<block v-for="(item, index) in supplies" :key="index">
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
	import tsPopup from '@/components/teaset/components/ts-popup.vue'
	export default {
		components: {
			tsPopup
		},
		data() {
			return {
				role: 'student', // company,school,student
				hidden: true,
				demands: [], // 项目列表，只返回3条数据
				supplies: [], // 创业大赛列表，只返回3条记录
				config: {},
				isLoading: false
			}
		},
		computed: {
			messageCount () {
				return 0
			}
		},
		methods: {
			showPopupWindow () {
				this.hidden = false;
			},
			hide () {
				this.hidden = true;
			},
			navigateTo (url = '') {
				this.hide();
				if (url) {
					uni.navigateTo({
						url: url
					});
				}
			},
			init () {
				this.isLoading = false;
				this.config = {
					messages: []
				};
				this.supplies = [];
				this.demands = [];
			},
			loadAppData () {
				if (this.isLoading == true) {
					return;
				}
				this.isLoading = true;
				uni.request({
					url: this.$API_BASE + `/app/esc/getAppInfo`,
					method: 'GET',
					dataType: 'json',
					data: {},
					success: (response) => {
						const res = response.data;
						if (res.errno === 0) {
							const data = res.data;
							if (data) {
								this.demands = data.demands;
								this.supplies = data.supplies;
								this.config = data.config;
							}
							this.isLoading = false;
						} else {
							console.log(res.errmsg);
						}
					}
				})
			},
			demandDetail (id) {
				uni.navigateTo({
					url: `job/demand/detail?id=${id}}`
				})
			},
			supplyDetail (id) {
				uni.navigateTo({
					url: `job/supply/detail?id=${id}}`
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
			setTimeout(() => {
        uni.stopPullDownRefresh()
      }, 1000)
		}
	}
</script>

<style>
	.ts-fab {
		position: fixed;
		display: block;
		z-index: 997;
		bottom: 50upx;
		right: 50upx;

		width: 100upx;
		height: 100upx;
		border-radius: 100upx;
		margin: 0 40upx;
		background-color: #e96900;
	}

	.ts-fab image {
		width: 60upx;
		height: 60upx;
		margin: 20upx;
	}

	.ts-fab text {
		position: fixed;
		bottom: 100upx;
		right: 80upx;
	}
</style>
