<template>
	<view class="page-section">
		<block v-if="hasLogin">
			<view class="ts-flex ts-row">
				<view class="ts-list-cell-navigate ts-navigate-right ts-navigate-badge" hover-class="ts-list-cell-hover" @tap="navigateToUrl('profile')">
					<view class="ts-flex ts-row">
						<image class="ts-flex" style="width: 100upx; height: 100upx;" :src="userInfo.avator"></image>
						<view class="ts-flex ts-center ts-padding">
							{{userInfo.username}}
							<view class="ts-padding-left">
								<ts-badge text="实名认证" type="danger"></ts-badge>
							</view>
						</view>
					</view>
					<view class="ts-pull-right" v-if="userInfo.mobile">
						<ts-badge :text="userInfo.mobile" type="default" inverted></ts-badge>
					</view>
				</view>
			</view>
			<view class="ts-flex ts-column ts-flex-item" style="margin-left: 20upx; margin-right: 20upx; color: #FFFFFF;  border-top-right-radius: 20upx; border-top-left-radius: 20upx; background-color: #46A4DA;">
				<view class="ts-flex ts-row">
					<view class="ts-flex ts-column ts-flex-item ts-center ts-padding">
						<text>累计收益(元)</text>
						<text class="ts-h3">0.00</text>
					</view>
				</view>
				<view class="ts-flex ts-row">
					<navigator hover-class="navigator-hover" class="ts-flex-item">
						<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
							<text>0</text>
							<text>订单数</text>
						</view>
					</navigator>
					<navigator hover-class="navigator-hover" class="ts-flex-item">
						<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
							<text>0</text>
							<text>粉丝数</text>
						</view>
					</navigator>
					<navigator hover-class="navigator-hover" class="ts-flex-item">
						<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
							<text>0</text>
							<text>会员数</text>
						</view>
					</navigator>
				</view>
			</view>
			<view class="ts-flex ts-row">
				<navigator hover-class="navigator-hover" class="ts-flex-item">
					<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
						<text>0.00</text>
						<text>余额(元)</text>
					</view>
				</navigator>
				<navigator hover-class="navigator-hover" class="ts-flex-item">
					<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
						<text>0.00</text>
						<text>待入账(元)</text>
					</view>
				</navigator>
				<navigator hover-class="navigator-hover" class="ts-flex-item">
					<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
						<text>0</text>
						<text>U币</text>
					</view>
				</navigator>
				<navigator hover-class="navigator-hover" class="ts-flex-item">
					<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
						<text>0</text>
						<text>优惠券</text>
					</view>
				</navigator>
			</view>
			<view class="ts-gap"></view>
			<view class="ts-list">
				<view class="ts-list-cell" hover-class="ts-list-cell-hover">
					<view class="ts-list-cell-navigate ts-navigate-right ts-navigate-badge">
						微友管家
						<ts-badge text="团队管理" type="default" inverted></ts-badge>
					</view>
				</view>
				<view class="ts-flex ts-row">
					<navigator url="member-jixiao" hover-class="navigator-hover" class="ts-flex-item">
						<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
							<image style="width: 80upx; height: 80upx;" src="../../static/photo.jpg"></image>
							<text>会员绩效</text>
						</view>
					</navigator>
					<navigator url="member-gaikuang" hover-class="navigator-hover" class="ts-flex-item">
						<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
							<image style="width: 80upx; height: 80upx;" src="../../static/photo.jpg"></image>
							<text>会员概况</text>
						</view>
					</navigator>
					<navigator url="member-mingxi" hover-class="navigator-hover" class="ts-flex-item">
						<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
							<image style="width: 80upx; height: 80upx;" src="../../static/photo.jpg"></image>
							<text>会员明细</text>
						</view>
					</navigator>
					<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
						<image style="width: 80upx; height: 80upx;" src="../../static/photo.jpg"></image>
						<text>帮助中心</text>
					</view>
				</view>
				<view class="ts-gap"></view>
				<view class="ts-list-cell" hover-class="ts-list-cell-hover">
					<view class="ts-list-cell-navigate ts-navigate-right ts-navigate-badge">
						我的店铺
						<ts-badge text="自营店铺" type="default" inverted></ts-badge>
					</view>
				</view>
				<view class="ts-flex ts-row">
					<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
						<text>0.00</text>
						<text>今日订单</text>
					</view>
					<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
						<text>0.00</text>
						<text>本月订单</text>
					</view>
					<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
						<text>0</text>
						<text>营业额</text>
					</view>
				</view>
				<view class="ts-gap"></view>
				<view class="ts-list-cell" hover-class="ts-list-cell-hover" @tap="navigateToUrl('order?tab=0')">
					<view class="ts-list-cell-navigate ts-navigate-right ts-navigate-badge">
						订单中心
						<ts-badge text="查看全部订单" type="default" inverted></ts-badge>
					</view>
				</view>
				<view class="ts-flex ts-row">
					<navigator url="order?tab=1" hover-class="navigator-hover" class="ts-flex-item">
						<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
							<image style="width: 80upx; height: 80upx;" src="../../static/photo.jpg"></image>
							<text>待付款</text>
						</view>
					</navigator>
					<navigator url="order?tab=2" hover-class="navigator-hover" class="ts-flex-item">
						<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
							<image style="width: 80upx; height: 80upx;" src="../../static/photo.jpg"></image>
							<text>待收货</text>
						</view>
					</navigator>
					<navigator url="order?tab=3" hover-class="navigator-hover" class="ts-flex-item">
						<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
							<image style="width: 80upx; height: 80upx;" src="../../static/photo.jpg"></image>
							<text>已完成</text>
						</view>
					</navigator>
					<navigator url="order?tab=4" hover-class="navigator-hover" class="ts-flex-item">
						<view class="ts-flex ts-column ts-flex-item  ts-center ts-padding">
							<image style="width: 80upx; height: 80upx;" src="../../static/photo.jpg"></image>
							<text>售后/退款</text>
						</view>
					</navigator>
				</view>
				<view class="ts-gap"></view>
				<view class="ts-list-cell" hover-class="ts-list-cell-hover" @tap="gotoCart">
					<view class="ts-list-cell-navigate ts-navigate-right ts-navigate-badge">
						购物车
						<ts-badge text="提现账户" type="default" inverted></ts-badge>
					</view>
				</view>
				<view class="ts-list-cell" hover-class="ts-list-cell-hover"  @tap="navigateToUrl('address/list')">
					<view class="ts-list-cell-navigate ts-navigate-right ts-navigate-badge">
						我的地址
						<ts-badge text="收货地址" type="default" inverted></ts-badge>
					</view>
				</view>
				<view class="ts-list-cell" hover-class="ts-list-cell-hover">
					<view class="ts-list-cell-navigate ts-navigate-right ts-navigate-badge">
						我的账户
						<ts-badge text="提现账户" type="default" inverted></ts-badge>
					</view>
				</view>
			</view>
		</block>
		<view class="ts-gap"></view>
		<view class="ts-list">
			<!-- <view class="ts-list-cell" hover-class="ts-list-cell-hover" @tap="handleClearStorage">
				<view class="ts-list-cell-navigate ts-navigate-right">
					清除缓存
				</view>
			</view> -->
			<view class="ts-list-cell" hover-class="ts-list-cell-hover" @tap="navigateToUrl('about')">
				<view class="ts-list-cell-navigate ts-navigate-right ts-navigate-badge">
					关于
					<ts-badge text="1.0.0" type="danger" inverted></ts-badge>
				</view>
			</view>
		</view>
		<view class="ts-row">
			<view class="btn-row">
				<button v-if="!hasLogin" type="primary" @tap="bindLogin">登录</button>
				<button v-if="hasLogin" type="default" @tap="bindLogout">退出登录</button>
			</view>
		</view>
	</view>
</template>
<script>
	import tsBadge from '@/components/teaset/components/ts-badge.vue'
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
	export default {
		components: {
			tsBadge
		},
		data () {
			return {
				hasUserInfo: true,
				userInfo: {
					avatarUrl: '../../static/photo.png',
					nickName: '用户名'
				}
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		async onLoad () {
			if (this.hasLogin) {
				//必须先登录才能获取用户的信息
				this.userInfo = await this.getUserInfo()
			}
		},
		onShow: async function() {
			// 			if (!this.hasUserInfo) {
			// 				uni.getUserInfo({
			// 					provider: this.loginProvider,
			// 					success: (e) => {
			// 						console.log("得到用户信息", e);
			// 						this.hasUserInfo = true;
			// 						this.userInfo = e.userInfo
			// 					},
			// 					fail: (e) => {
			// 						console.log("fail", e);
			// 						let content = e.errMsg;
			// 						if (~content.indexOf("uni.login")) {
			// 							//content = "请在登录页面完成登录操作"
			// 						}
			// 					}
			// 				});
			// 			}
		},
		onNavigationBarButtonTap (e) {
			uni.navigateTo({
				url: '/platforms/app-plus/about/about'
			})
		},
		methods: {
			bindLogin () {
				uni.navigateTo({
					url: '../auth/login'
				})
      },
      getUserInfo () {},
			bindLogout () {
        // 登出
			},
			handleClearStorage () {
				// 登出
				uni.showToast({
					title: '缓存已清理'
				})
			},
			navigateToUrl () {
				if (url) {
					uni.navigateTo({
						url: url
					})
				}
			},
			gotoCart () {
				uni.navigateTo({
					url: '/pages/my/shopingcart/index'
				})
			}
		}
	}
</script>
<style>
	.page-section {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: flex-start;
	}
	.btn-row {
		margin: 50upx 20upx;
		display: flex;
		flex: 1;
		flex-direction: row;
	}
	.btn-row button {
		justify-content: center;
		align-items: center;
		display: flex;
		flex-direction: row;
		flex: 1;
	}
</style>
