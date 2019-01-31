<template>
	<view class="ts-column  ts-flex-item">
		<ts-search-bar v-model="keywords" @search="doSearch"></ts-search-bar>
		<view class="ts-gap"></view>
		<block v-for="(item,index) in searchResult" :key="item.id">
			<view class="ts-column ts-padding" hover-class="navigator-hover" @tap="detail(item.id)">
				<view class="ts-row ts-flex-item">
					<image style="width: 200upx; height: 150upx;" :src="item.cover_image"></image>
					<view class="ts-column ts-flex-item ts-padding-left ts-padding-right" style="height: 150upx; justify-content: space-between;">
						<view class="" style="justify-content: space-between; align-items: center;">
							<view class="ts-row ts-h5 ts-text-bold ts-ellipsis-2">{{item.title}}</view>
							<ts-tag :text="item.type" size="small" type="danger"></ts-tag>
						</view>

						<view class="ts-row ts-h5">{{item.address}}</view>
						<view class="ts-row">
							<view class="" style="flex-wrap: wrap;">
								<view v-for="(tag,idx) of item.tags" :key="idx" class="ts-padding-right">
									<ts-tag :text="tag" size="small"></ts-tag>
								</view>
							</view>
						</view>

					</view>
				</view>

			</view>
			<view class="ts-gap"></view>
		</block>


		<view class="ts-column">
			<ts-load-more :loadingType="loadingType"  @tap="loadMoreSearchResult"></ts-load-more>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

				keywords: '',
				searchResult: [],


				loadingType: 0, //上拉的状态：0-loading前；1-loading中；2-没有更多了
				page: 0,
			}
		},
		methods: {
			init() {
				this.searchResult = [];
				this.page = 0;
				this.loadingType = 0;
			},
			doSearch() {
				this.init();
				this.loadMoreSearchResult();
			},

			loadMoreSearchResult() {
				//上拉的状态：0-loading前；1-loading中；2-没有更多了
				if (this.loadingType !== 0) {
					return;
				}
				this.loadingType = 1;
				this.page = this.page + 1;

				uni.request({
					url: this.$API_BASE + `/app/esc/searchSchool`,
					method: 'GET',
					dataType: 'json',
					data: {
						page: this.page,
						key: this.keywords,
					},
					success: (response) => {
						const res = response.data;
						if (res.errno===0) {
							const data = res.data;
							if (data && data.data) {
								this.searchResult = this.searchResult.concat(data.data);
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
			},
			detail(id) {
				uni.navigateTo({
					url: `detail?id=${id}`,
				})
			}
		},
		onLoad() {
			this.doSearch();
		},
		onReachBottom: function() {
			this.loadMoreSearchResult();
		},
		onPullDownRefresh() {
			this.doSearch();
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>

<style>

</style>
