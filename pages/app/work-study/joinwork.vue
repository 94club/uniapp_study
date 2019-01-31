<template>
	<view class="content">
		<view class="title">
			请填写相关信息
		</view>
		<view class="box" v-for="(item,index) of listData" :key="index">
			<view class="box-title">{{item.title}} <text v-if="item.isActive" style="color: red;">*</text></view>
			<view class="box-input"><input type="text" v-model="item.inputvalue" @blur="handleBlur(index)"></view>
		</view>
		<view class="btn">
			<view class="button" @click="handleClick">提交报名申请</view>
		</view>
	</view>
</template>

<script>
export default {
	data () {
		return {
			listData: [{
				title: '请输入你的姓名',
				inputvalue: '',
				isActive: true
			}, {
				title: '请输入你的学号',
				inputvalue: '',
				isActive: true
			}, {
				title: '请输入你的班级',
				inputvalue: '',
				isActive: true
			}, {
				title: '请输入你的手机号码',
				inputvalue: '',
				isActive: true
			}]
		}
	},
	methods:{
		handleBlur (index) {
			if(this.listData[index].inputvalue==''){
				this.listData[index].isActive=true;
			}else{
				this.listData[index].isActive=false;
			}
		},
		handleClick () {
			let test =0;
			this.listData.forEach(function(value,index){
				if(value.isActive==true){
					uni.showToast({
						title:'请将信息填完整',
						icon:'none'
					})
					test=1;
					return ;
				}
			})
			if(test!=0){
				return ;
			}
			uni.showToast({
				title:'申请提交成功!',
				icon:'success',
				success () {
					let timer=setTimeout(function(){
						uni.navigateTo({
							url:'../index'
						})
						clearTimeout(timer)
					}, 1500)
				}
			})
		}
	}
}
</script>
<style scoped>
	.content{
		width: 100%;
		flex-direction: column;
	}
	.title{
		width: 100%;
		height: 120upx;
		justify-content: center;
		align-items: center;
		font-size: 40upx;
		font-weight: bold;
	}
	.box{
		width: 100%;
		flex-direction: column;
		box-sizing: border-box;
		padding: 10upx;
		margin-bottom: 30upx;
	}
	.box-title{
		width: 100%;
		margin-bottom: 20upx;
		font-size: 35upx;
		font-weight: bold;
		color: #B2B2B2;
	}
	.box-input{
		flex: 1;
		border-bottom: 1upx solid #C8C7CC;
		font-size: 30upx;
	}
	.btn{
		width: 100%;
		justify-content: center;
	}
	.button{
		width: 40%;
		height: 80upx;
		background: #4CD964;
		color: white;
		font-weight: bold;
		justify-content: center;
		align-items: center;
	}
</style>