<template>
	<view class="ts-flex ts-column ts-flex-item">
		<ts-banner image='https://via.placeholder.com/750x250' height="250"></ts-banner>
		<ts-search-bar v-model="keywords" @search="doSearch"></ts-search-bar>
		<ts-segmented-control :values="tabs" v-model="currentTab" style-type="text" active-color="#d81e06" @clickItem="clickItem"
		 borderColor="#d81e06"></ts-segmented-control>
		<view class="ts-list">
			<view class="ts-list-cell" v-for="(item,index) in list" hover-class="navigator-hover" :key="index" @tap="navigateToUrl('home')">
				<view class="ts-media-list">
					<image class="ts-media-list-logo" :src="item.cover_image"></image>
					<view class="ts-flex-item ts-column" style="justify-content: space-between;">
						<view class="ts-h5 ts-ellipsis-2">{{item.title}}</view>
						<view class="ts-h5">{{item.organizer}}</view>
						<view class="ts-h5">{{item.address}}</view>
						<view class="ts-h5">{{item.time}}</view>
						<view class="ts-row">
							<ts-badge :text="item.type" type="primary"></ts-badge>
							<ts-badge :text="item.status" type="danger" :padding-left="10"></ts-badge>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="ts-flex ts-column">
			<ts-load-more :loadingType="loadingType" @tap="getEventListMoreData"></ts-load-more>
		</view>
	</view>
</template>
<script>
	import tsSegmentedControl from '@/components/teaset/components/ts-segmented-control.vue'
	import tsBanner from '@/components/teaset/components/ts-banner.vue'
	import tsSearchBar from '@/components/teaset/components/ts-search-bar.vue'
	import tsPopup from '@/components/teaset/components/ts-popup.vue'
	export default {
		components: {
			tsSegmentedControl,
			tsBanner,
			tsSearchBar,
			tsPopup
		},
		data () {
			return {
				currentTab: 0,
				tabs: ['全部', '学校', '院系', '班级', '社团'],
				keywords: '',
				loadingType: 0, // 上拉的状态：0-loading前；1-loading中；2-没有更多了
				page: 0,
				list: []
			}
		},
		onLoad () {
			this.doSearch()
		},
		onPullDownRefresh () {
			this.doSearch()
			setTimeout(function() {
				uni.stopPullDownRefresh()
			}, 1000)
		},
		onReachBottom() {
			this.getEventListMoreData()
		},
		computed: {
			messageCount() {
				return this.list.length
			}
		},
		methods: {
			clickItem() {
				this.doSearch()
			},
			navigateToUrl(url) {
				if (url) {
					uni.navigateTo({
						url: url
					})
				}
			},
			callTelphone (tel) {
				uni.makePhoneCall({
					phoneNumber: tel
				})
			},
			doSearch () {
				//重置状态数据
				this.list = []
				this.page = 0
				this.loadingType = 0
				this.getEventListMoreData()
			},
			getEventListMoreData () {
				// 上拉的状态：0-loading前；1-loading中；2-没有更多了
				if (this.loadingType !== 0) {
					return
				}
				this.loadingType = 1
				this.page = this.page + 1
				uni.request({
					url: this.$API_BASE + `/app/activity/getEventList`,
					method: 'GET',
					dataType: 'json',
					data: {
						key: this.keywords,
						page: this.page,
						type: this.tabs[this.currentTab]
					},
					success: (response) => {
						const res = response.data
						if (res.errno === 0) {
							const data = res.data
							if (data && data.data) {
								this.list = this.list.concat(data.data)
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
			}
		}
	}
</script>

<style>
	.ts-media-list {
		padding: 20upx 20upx;
	}

	.ts-media-list-logo {
		padding: 0;
		width: 300upx;
		height: 230upx;
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
</style>
