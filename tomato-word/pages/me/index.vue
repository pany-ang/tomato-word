<template>
	<view class="content">
		<view class="background-red"></view>
		<view class="background-gray"></view>
		<view class="logo">
			<image class="logoImg" src="../../static/tomato2.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
		width: 100vw;
		min-height: 100vh;
		/* display: flex;
		align-items: flex-start;
		justify-content: center;
		flex-wrap: wrap; */
	}
	
	.background-red {
		z-index: -1;
		width: 100vw;
		height: 50vh;
		position: fixed;
		top: 0px;
		left: 0px;
		background-image: linear-gradient(#e16531, #F5F5F5);
	}
	
	.background-gray {
		z-index: -1;
		width: 100vw;
		height: 50vh;
		position: fixed;
		top: 50vh;
		left: 0px;
		background-color: #F5F5F5;
	}
	
	.logo {
		width: 90vw;
		display: flex;
		justify-content: center;
	}
	
	.logoImg {
		width: 82px;
		height: 82px;
	}
</style>
