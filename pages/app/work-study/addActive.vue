<template>
	<view class="content">
		<view class="title">
			请填写相关信息
		</view>
		<view class="box">
			<view class="box-title">请输入任务名称</view>
			<view class="box-input"><input type="text"></view>
		</view>
		<view class="btn">
			<view class="button" @click="handleClick">发布任务</view>
		</view>
	</view>
</template>
<script>
export default {
	data(){
		return {
		}
	},
	methods:{
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
		color: red;
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