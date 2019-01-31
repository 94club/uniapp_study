<template>
	<view class="ts-column  ts-flex-item">
		<!-- 弹出窗口 -->
		<ts-popup v-model="hiddenPopupWindow">
			<view class="ts-column ts-flex-item" style="min-height: 400upx">
				<view class="ts-row ts-flex-item ts-padding">
					<view class="ts-column">
						<view class="ts-column">
							<view class="ts-row ts-flex-item">
								<text>薪资</text>
							</view>
							<ts-tag-selector type="primary" :multiple="false" :defaultIndex="selectedSalaryTag" :tags="salaryTags" @change="selectSalaryTag"></ts-tag-selector>
						</view>
						<view class="ts-column ts-padding-top">
							<view class="ts-row ts-flex-item">
								<text>工作年限</text>
							</view>
							<ts-tag-selector type="primary" :multiple="false" :defaultIndex="selectedWorkingYearsTags" :tags="workingYearsTags"
							 @change="selectWorkingYearsTag"></ts-tag-selector>
						</view>
						<view class="ts-column ts-padding-top">
							<view class="ts-row ts-flex-item">
								<text>学历</text>
							</view>
							<ts-tag-selector type="primary" :multiple="true" :defaultIndex="selectedDiplomasTags" :tags="diplomasTags"
							 @change="selectDiplomasTag"></ts-tag-selector>
						</view>
					</view>
				</view>
				<view class="ts-row  ts-padding-top">
					<view class="ts-row ts-flex-item">
						<ts-button type="primary" @click="hiddenWindow">取消</ts-button>
					</view>
					<view class="ts-row ts-flex-item">
						<ts-button type="danger" @click="hiddenWindow">确定</ts-button>
					</view>
				</view>
			</view>
		</ts-popup>
		<ts-search-bar v-model="keywords" @search="doSearch" placeholder="检索职位、企业名称" :showFilterButton="true" @filter="doFilter"></ts-search-bar>
		<view class="ts-gap"></view>
		<ts-segmented-control :values="tabs" v-model="currentTab" style-type="text" @clickItem="clickItem"></ts-segmented-control>
		<block v-for="(item,index) in searchResult" :key="index">
			<view class="ts-column ts-flex-item ts-padding" hover-class="navigator-hover" @tap="detail(item.id)">
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
		<view class="ts-column">
			<ts-load-more :loadingType="loadingType" @tap="loadMoreSearchResult"></ts-load-more>
		</view>
	</view>
</template>

<script>
	import tsSegmentedControl from '@/components/teaset/components/ts-segmented-control.vue'
	import tsPopup from '@/components/teaset/components/ts-popup.vue'
	import tsTagSelector from '@/components/teaset/components/ts-tag-selector.vue'
	export default {
		components: {
			tsSegmentedControl,
			tsPopup,
			tsTagSelector
		},
		data () {
			return {
				hiddenPopupWindow: true,
				tabs: ['全部', '兼职', '全职', '实习生'],
				currentTab: 0,
				jobType: '',
				keywords: '',
				searchResult: [],
				loadingType: 0, //上拉的状态：0-loading前；1-loading中；2-没有更多了
				page: 0,
				diplomasTags: ["博士", "硕士", "大专", "高中", "不限"], //学历
				workingYearsTags: ["不限", "应届生", "1-3年", "3-5年", "5-8年", "8-10年", "10年以上"], //工龄
				salaryTags: ['面议', '3-5K', "5-10K", "1-2万", "2-3万"], //薪水
				selectedDiplomasTags: [0, 2, 3],
				selectedWorkingYearsTags: 1,
				selectedSalaryTag: 0
			}
		},
		methods: {
			selectSalaryTag (item) {
				console.log(JSON.stringify(item))
			},
			selectDiplomasTag (item) {
				console.log(JSON.stringify(item))
			},
			selectWorkingYearsTag (item) {
				console.log(JSON.stringify(item))
			},
			showWindow () {
				this.hiddenPopupWindow = false
			},
			hiddenWindow () {
				console.log('hiddenWindow')
				this.hiddenPopupWindow = true
			},
			init () {
				this.searchResult = []
				this.page = 0
				this.loadingType = 0
			},
			doFilter () {
				//弹出过滤选择窗口
				this.showWindow()
			},
			doSearch () {
				this.init()
				if (this.currentTab === 0) {
					this.jobType = ''
				} else if (this.currentTab === 1) {
					this.jobType = '兼职'
				} else if (this.currentTab === 2) {
					this.jobType = '全职'
				} else if (this.currentTab === 3) {
					this.jobType = '实习生'
				}
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
					url: this.$API_BASE + `/app/esc/searchJobDemand`,
					method: 'GET',
					dataType: 'json',
					data: {
						page: this.page,
						key: this.keywords,
						type: this.jobType,
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
			},
			clickItem (index) {
				this.doSearch()
			},
		},
		onLoad () {
			this.doSearch()
		},
		onReachBottom () {
			this.loadMoreSearchResult()
		},
		onPullDownRefresh () {
			this.doSearch()
			setTimeout(() => {
				uni.stopPullDownRefresh()
			}, 1000)
		}
	}
</script>
