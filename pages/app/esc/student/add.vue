<template>
	<view class="ts-column ts-flex-item">
		<view class='feedback-title'>
			<view class="ts-row ts-center">
				<ts-icon type="person" size="28" color="#d81e06"></ts-icon>
				<text class="ts-margin-left">姓名</text>
			</view>
			<view class="feedback-body ts-flex-item">
				<input class="feedback-input" v-model="sendData.name" placeholder="请填写姓名" />
			</view>
		</view>

		<ts-line />

		<view class='feedback-title'>
			<text>性别</text>
			<radio-group class="radio-group" @change="radioChange">
				<label class="radio">
					<radio value="男" checked />男
				</label>
				<label class="radio">
					<radio value="女" />女
				</label>
			</radio-group>
		</view>

		<ts-line />

		<view class='feedback-title'>
			<text>学历</text>
			<radio-group class="radio-group" @change="radioChange">
				<label class="radio">
					<radio value="博士" checked />博士
				</label>
				<label class="radio">
					<radio value="硕士" />硕士
				</label>
				<label class="radio">
					<radio value="本科" />本科
				</label>
				<label class="radio">
					<radio value="大专" />大专
				</label>
				<label class="radio">
					<radio value="中专" />中专
				</label>
			</radio-group>
		</view>
		<view class="ts-gap"></view>

		<view class="ts-column ts-flex-item">
			<ts-segmented-control :values="tabs" v-model="currentTab" style-type="text" active-color="#d81e06" borderColor="#d81e06"></ts-segmented-control>


			<view v-show="currentTab === 0" class="ts-column ts-flex-item ts-padding">



				<view class='feedback-title'>
					<view class="ts-row ts-center">
						<ts-icon type="email" size="28" color="#d81e06"></ts-icon>
						<text class="ts-margin-left">身份证号码</text>
					</view>
				</view>
				<view class="feedback-body">
					<input class="feedback-input" v-model="sendData.contact" placeholder="请填写身份证号码" />
				</view>


				<view class='feedback-title'>
					<view class="ts-row ts-center">
						<ts-icon type="phone" size="28" color="#d81e06"></ts-icon>
						<text class="ts-margin-left">联系电话</text>
					</view>
				</view>
				<view class="feedback-body">
					<input class="feedback-input" type="number" v-model="sendData.contact" placeholder="请填写常用的手机号码" />
				</view>

				<view class='feedback-title'>
					<view class="ts-row ts-center">
						<ts-icon type="email" size="28" color="#d81e06"></ts-icon>
						<text class="ts-margin-left">Email</text>
					</view>
				</view>
				<view class="feedback-body">
					<input class="feedback-input" v-model="sendData.contact" placeholder="请填写邮箱地址" />
				</view>


				<view class='feedback-title'>
					<text>自我评价</text>
				</view>
				<view class="feedback-body">
					<textarea placeholder="自我评价..." v-model="sendData.content" class="feedback-textarea"></textarea>
				</view>
			</view>


			<view v-show="currentTab === 1" class="ts-column ts-flex-item ts-padding">
				<view class='feedback-title'>
					<text>描述（Markdown格式）</text>
				</view>
				<view class="feedback-body">
					<textarea placeholder="详细描述..." v-model="sendData.content" class="feedback-textarea"></textarea>
				</view>

			</view>
			<view v-show="currentTab === 2" class="ts-column ts-flex-item ts-padding">
				<view class='feedback-title'>
					<text>描述（Markdown格式）</text>
				</view>
				<view class="feedback-body">
					<textarea placeholder="详细描述..." v-model="sendData.content" class="feedback-textarea"></textarea>
				</view>

			</view>

			<view v-show="currentTab === 3" class="ts-column ts-flex-item ts-padding">
				<view class='feedback-title'>
					<text>证书证件照片(选填，总大小10M以下)</text>
				</view>
				<view class="feedback-body">
					<ts-image-uploader @change="handleFileSelected"></ts-image-uploader>
				</view>
			</view>

			<view v-show="currentTab === 4" class="ts-column ts-flex-item ts-padding">
				<view class='feedback-title'>
					<text>个人照片(选填，总大小10M以下)</text>
				</view>
				<view class="feedback-body">
					<ts-image-uploader @change="handleFileSelected"></ts-image-uploader>
				</view>
			</view>

		</view>

		<button class="feedback-submit" @tap="send">提交</button>
	</view>
</template>

<script>
	import tsSegmentedControl from '@/components/teaset/components/ts-segmented-control.vue';
	import tsImageUploader from '@/components/teaset/components/ts-image-uploader.vue';
	import tsIcon from '@/components/teaset/components/ts-icon.vue';
	import tsBadge from '@/components/teaset/components/ts-badge.vue';
	import tsButton from '@/components/teaset/components/ts-button.vue';
	import tsBanner from '@/components/teaset/components/ts-banner.vue';


	export default {
		components: {
			tsImageUploader,
			tsIcon,
			tsBadge,
			tsSegmentedControl,
			tsButton,
			tsBanner,
		},
		data(){return  {
			tabs: ['基本信息', '教育经历', '实践经历', '能力证明', '其它材料'],
			currentTab: 0,
			type: '求购',
			imageList: [],
			sendData: {
				type: '求购',
				content: '',
				contact: '',
				location: {
					name: '',
					address: '',
					latitude: '',
					longitude: ''
				}
			}
		}},
		onUnload() {
			this.init();
		},
		onLoad() {

			this.init();

			//获取用户当前的坐标信息
			uni.getLocation({
				type: 'gcj02', //返回可以用于uni.openLocation的经纬度
				success: (res) => {
					console.log(JSON.stringify(res));
					const latitude = res.latitude;
					const longitude = res.longitude;
					this.sendData.location = {
						latitude: latitude,
						longitude: longitude,
						address: `(${latitude},${longitude})`,
						name: ''
					};
				}
			});
		},
		methods: {
			init() {
				this.imageList = [];
				this.sendData = {
					type: '求购',
					content: '',
					contact: '',
					location: {
						name: '',
						address: '',
						latitude: '',
						longitude: ''
					}
				};
			},
			handleFileSelected(e) {
				// console.log(JSON.stringify(e));
				this.imageList = e;
			},
			radioChange(e) {
				// console.log('radio发生change事件，携带value值为：' + e.detail.value);
				this.type = e.detail.value;
				this.sendData.type = e.detail.value;
			},
			chooseAddress() {
				uni.chooseLocation({
					success: (res) => {
						//                     console.log('位置名称：' + res.name);
						//                     console.log('详细地址：' + res.address);
						//                     console.log('纬度：' + res.latitude);
						//                     console.log('经度：' + res.longitude);
						if (res) {
							let {
								name,
								address,
								longitude,
								latitude
							} = res;
							this.sendData.location = {
								name,
								address,
								longitude,
								latitude
							};
							console.log(JSON.stringify(res));
						}
					}
				});
			},

			async send() {
				//{"type":"捡到","content":"雨伞一把","contact":"18928779564","location":{"name":"番禺区政府","address":"广东省广州市番禺区市桥街清河东路319号","longitude":113.38424,"latitude":22.93772}}
				//console.log(JSON.stringify(this.sendData));
				let imgs = this.imageList.map(value => {
					return {
						name: 'jjxy.lost-find',
						uri: value
					};
				});

				// console.log(JSON.stringify(imgs));

				//             //实现图片上传功能
				//             await uni.uploadFile({
				//                 url: 'https://service.dcloud.net.cn/feedback',
				//                 files: imgs,
				//                 formData: self.sendData,
				//                 success: res => {
				//                     if (res.statusCode === 200) {
				//                         uni.showToast({
				//                             title: '上报成功!'
				//                         });
				//                         //将上传得到的路径及其它信息保存到数据库
				//
				//                         self.imageList = [];
				//                         self.sendData = {
				//                             content: '',
				//                             contact: '',
				//                             location: {
				//                                 name: '',
				//                                 address: '',
				//                                 latitude: '',
				//                                 longitude: ''
				//                             }
				//                         };
				//                     }
				//                 },
				//                 fail: res => {
				//                     console.log(JSON.stringify(res));
				//                 }
				//             });

				uni.navigateBack({});
			}
		}
	};
</script>

<style>
	page view {
		display: flex;
		flex-direction: column;

		font-size: 32upx;
	}

	input {
		display: flex;
		flex-direction: row;
		flex: 1;
	}



	/*问题反馈*/

	.feedback-title {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 20upx;
		/* color: #8f8f94; */
		font-size: 32upx;
	}

	.feedback-body {
		background: #fff;
	}

	.feedback-textarea {
		height: 200upx;
		font-size: 34upx;
		line-height: 50upx;
		width: 100%;
		box-sizing: border-box;
		padding: 20upx 30upx 0;
	}

	.feedback-input {
		font-size: 32upx;
		padding: 0upx 20upx;
		/* height: 50upx; */
		/* min-height: 50upx; */
		/* padding: 15upx 20upx; */
		/* line-height: 50upx; */
	}

	.feedback-submit {
		background: #d81e06;
		color: #ffffff;
		margin: 20upx;
	}
</style>
