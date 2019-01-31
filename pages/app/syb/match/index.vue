<template>
	<view class="ts-column ts-flex-item">
		<ts-search-bar v-model="keywords" @search="doSearch" placeholder="检索全部商品"></ts-search-bar>
		<view class="ts-gap"></view>
		<view class="ts-column">
			<block v-for="(item,index) in searchResult" :key="index">
				<view class="ts-column ts-flex-item ts-padding" hover-class="navigator-hover" @tap="detail(item.id)">
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
				<view class="ts-gap"></view>
			</block>
		</view>
		<view class="ts-column">
			<ts-load-more :loadingType="loadingType"  @tap="loadMoreSearchResult"></ts-load-more>
		</view>
	</view>
</template>
<script>
	export default {
		data () {
			return {
				keywords: '',
				searchResult: [],
				loadingType: 0, //上拉的状态：0-loading前；1-loading中；2-没有更多了
				page: 0
			}
		},
		methods: {
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
					url: this.$API_BASE + `/app/syb/searchMatch`,
					method: 'GET',
					dataType: 'json',
					data: {
						key: this.keywords,
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
			detail (id) {
				uni.navigateTo({
					url: `detail?id=${id}`
				})
			}
		},
		onLoad () {
			this.doSearch()
		},
		onReachBottom () {
			this.loadMoreSearchResult()
		},
		onPullDownRefresh () {
			this.doSearch()
			setTimeout(()=>{
				uni.stopPullDownRefresh()
			},1000)
		}
	}
</script>
