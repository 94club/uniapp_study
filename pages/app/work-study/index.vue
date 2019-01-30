<template>
	<view class="ts-column ts-full-width">
		<ts-popup v-model="hidden">
			<view class="ts-grid-9">
				<view class="ts-grid-9-item" hover-class="ts-grid-9-item-hover" @tap="navigateTo('addActive')">
					<ts-icon type="plus" size="80" color="#d81e06"></ts-icon>
					<text class="ts-grid-9-text ts-padding">发布</text>
				</view>
				<view class="ts-grid-9-item" hover-class="ts-grid-9-item-hover" @tap="navigateTo('my')">
					<ts-icon type="person" size="80" color="#d81e06"></ts-icon>
					<text class="ts-grid-9-text ts-padding">我的</text>
				</view>
			</view>
			<button type="warn" style="width: 100%; background-color: #e31436; 	border-radius: 0upx; height: 100upx;" @tap="hide">关闭</button>
		</ts-popup>
		<ts-banner :image='config.cover_image' height="250"></ts-banner>
		<view class="ts-column">
			<view class="ts-row ts-flex-item">
				<view class="ts-row ts-flex-item" @tap="actionSheetEventTypeTap">
					<ts-button type="danger" :height="80">
						<ts-icon type="bars" color="#fff" size="32"></ts-icon>
						<text class="ts-padding">{{eventType}}</text>
						<ts-icon type="bars" color="#fff" size="32"></ts-icon>
					</ts-button>
				</view>
				<view class="ts-row ts-flex-item" @tap="actionSheetSexTypeTap">
					<ts-button type="primary" :height="80">
						<ts-icon type="bars" color="#fff" size="32"></ts-icon>
						<text class="ts-padding">{{sexType}}</text>
						<ts-icon type="bars" color="#fff" size="32"></ts-icon>
					</ts-button>
				</view>
			</view>
			<ts-search-bar v-model="keywords" @search="doSearch"></ts-search-bar>
			<view class="ts-gap"></view>
			<view class="slog-box">
				<text>—— 勤工助学 ——</text>
				<text class="slog">{{config.slog}}</text>
			</view>
			<view class="ts-column ts-flex-item" hover-class="navigator-hover" v-for="(item,index) in list" :key="index" @tap="navigate(item.id)">
				<view class="ts-gap"></view>
				<view class="ts-column ts-flex-item ts-padding">
					<view class="ts-row">
						<image :src="item.cover_image" style="width: 100%;"></image>
					</view>
					<view class="ts-h5 ts-padding-top">{{item.work_time}}</view>
					<view class="ts-h5 ts-padding-top">{{item.title}}</view>
					<view class="ts-h4 ts-padding-top">{{item.organizer}}</view>
				</view>
			</view>
		</view>
		<view class="ts-flex ts-column">
			<ts-load-more :loadingType="loadingType" @tap="getEventListMoreData"></ts-load-more>
		</view>
	</view>
</template>

<script>
	import tsBanner from '@/components/teaset/components/ts-banner.vue';
	import tsBadge from '@/components/teaset/components/ts-badge.vue';
	import tsIcon from '@/components/teaset/components/ts-icon.vue';
	import tsSearchBar from '@/components/teaset/components/ts-search-bar.vue';
	import tsLoadMore from '@/components/teaset/components/ts-load-more.vue';
	import tsPopup from '@/components/teaset/components/ts-popup.vue';
	import tsButton from '@/components/teaset/components/ts-button.vue';

	var self;
	export default {
		components: {
			tsBadge,
			tsBanner,
			tsIcon,
			tsSearchBar,
			tsLoadMore,
			tsPopup,
			tsButton,
		},
		data() {
			return {
				config: {
					slog: '为你整理近期勤工助学任务',
					cover_image: '',
				},
				sexType: '不限',
				eventType: '校内',
				hidden: true,
				keywords: '',
				loadingType: 0, //上拉的状态：0-loading前；1-loading中；2-没有更多了
				page: 0,
				list: []
			}
		},
		computed: {
			messageCount() {
				return this.list.length;
			},
		},
		async onLoad() {
			// self = this;


			uni.request({
				url: this.$API_BASE + `/app/work-study/getAppConfig`,
				method: 'GET',
				dataType: 'json',
				data: {},
				success: (response) => {
					const res = response.data;

					console.log(JSON.stringify(res));
					if (res.errno === 0) {
						const data = res.data;
						if (data) {
							this.config = data;
						}
					} else {
						console.log(res.errmsg);
					}
				}
			});

			await this.doSearch();
		},
		async onReachBottom() {
			console.log('onReachBottom');
			await this.getEventListMoreData();
		},
		methods: {
			actionSheetEventTypeTap() {
				const itemList = ['全部', '校内', '校外'];
				uni.showActionSheet({
					itemList: itemList,
					success: (e) => {
						console.log(JSON.stringify(e));
						this.eventType = itemList[e.tapIndex];
						this.doSearch();
					}
				})
			},
			actionSheetSexTypeTap() {
				const itemList = ['不限', '男', '女'];
				uni.showActionSheet({
					itemList: itemList,
					success: (e) => {
						console.log(JSON.stringify(e));
						this.sexType = itemList[e.tapIndex];
						this.doSearch();
					}
				})
			},
			showPopupWindow() {
				this.hidden = false;
			},
			hide() {
				this.hidden = true;
			},
			navigate(id) {
				uni.navigateTo({
					url: `detail?id=${id}`
				})
			},
			navigateTo(url = '') {
				this.hide();
				if (url) {
					uni.navigateTo({
						url: url
					});
				}
			},
			async doSearch(keywords = '') {
				//重置状态数据
				this.list = [];
				this.page = 0;
				this.loadingType = 0;
				await this.getEventListMoreData();
				// console.log(keywords);
			},
			async getEventListMoreData() {
				//上拉的状态：0-loading前；1-loading中；2-没有更多了
				if (this.loadingType !== 0) {
					return;
				}
				this.loadingType = 1;
				this.page = this.page + 1;
				uni.request({
					url: this.$API_BASE + `/app/work-study/getJobList`,
					method: 'GET',
					dataType: 'json',
					data: {
						key: this.keywords,
						page: this.page,
						sex: this.sexType,
						type: this.eventType,
					},
					success: (response) => {
						const res = response.data;

						console.log(JSON.stringify(res));
						if (res.errno === 0) {
							const data = res.data;
							if (data && data.data) {
								this.list = this.list.concat(data.data);
							}

							if (data.totalPages === data.currentPage) {
								this.loadingType = 2; //2-没有更多了
							} else {
								this.loadingType = 0; //开启新一轮加载
							}
						} else {
							console.log(res.errmsg);
						}
					}
				});
			}
		}
	};
</script>

<style>
	.ts-badge {
		margin-right: 20upx;
	}

	.image-box {
		height: 180upx;
		width: 180upx;
		padding-right: 10upx;
		padding-bottom: 10upx;
	}

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


	.slog-box {
		padding: 20upx;
		justify-content: center;
		align-items: center;
		font-size: 40upx;
		font-weight: bold;
		flex-direction: column;
		flex: 1;
	}

	.slog {
		font-size: 30upx;
		font-weight: 100;
		margin-top: 10upx;
	}
</style>
