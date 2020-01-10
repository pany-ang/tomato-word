<template>
	<view class="content">
		<view class="background-red"></view>
		<view class="background-gray"></view>
		<view class="top">
			<input class="input" type="text" v-model:value="value" placeholder="请输入需要翻译的单词" maxlength="-1" confirm-type="search" @input="input" @confirm="search" />
			<icon class="icon" type="clear" size="20" v-show="showFlag" @click="clear" />
		</view>
		<swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000" indicator-color="rgba(255, 255, 255, 0.3)" indicator-active-color="#FFFFFF">
			<swiper-item>
				<image src="https://edu-wps.ks3-cn-beijing.ksyun.com/image/8b62e725f61ee233edaeda57c0a61c61.png"></image>
			</swiper-item>
			<swiper-item>
				<image src="https://edu-wps.ks3-cn-beijing.ksyun.com/image/8b62e725f61ee233edaeda57c0a61c61.png"></image>
			</swiper-item>
			<swiper-item>
				<image src="https://edu-wps.ks3-cn-beijing.ksyun.com/image/8b62e725f61ee233edaeda57c0a61c61.png"></image>
			</swiper-item>
			<swiper-item>
				<image src="https://edu-wps.ks3-cn-beijing.ksyun.com/image/8b62e725f61ee233edaeda57c0a61c61.png"></image>
			</swiper-item>
			<swiper-item>
				<image src="https://edu-wps.ks3-cn-beijing.ksyun.com/image/8b62e725f61ee233edaeda57c0a61c61.png"></image>
			</swiper-item>
			<swiper-item>
				<image src="https://edu-wps.ks3-cn-beijing.ksyun.com/image/8b62e725f61ee233edaeda57c0a61c61.png"></image>
			</swiper-item>
			<swiper-item>
				<image src="https://edu-wps.ks3-cn-beijing.ksyun.com/image/8b62e725f61ee233edaeda57c0a61c61.png"></image>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				showFlag: false
			}
		},
		onLoad() {

		},
		methods: {
			search(e) {
				console.log(e.detail.value)
			},
			input(e) {
				console.log(e.detail.value)
				if (e.detail.value.length > 0) {
					this.showFlag = true
				} else {
					this.showFlag = false
				}
			},
			clear() {
				this.value = ''
				this.showFlag = false
			}
		}
	}
</script>

<style>
	.content {
		width: 100vw;
		min-height: 100vh;
		display: flex;
		align-items: flex-start;
		justify-content: center;
		flex-wrap: wrap;
	}

	.background-red {
		z-index: -1;
		width: 100vw;
		height: 40vh;
		position: fixed;
		top: 0px;
		left: 0px;
		background-image: linear-gradient(#e16531, #F5F5F5);
	}

	.background-gray {
		z-index: -1;
		width: 100vw;
		height: 60vh;
		position: fixed;
		top: 40vh;
		left: 0px;
		background-color: #F5F5F5;
	}

	.top {
		width: 90vw;
		position: relative;
	}

	.input {
		height: 50px;
		font-size: 16px;
		margin-top: 40px;
		background-color: #FFFFFF;
		border-radius: 8px;
		background-image: url(../../static/indexHL.png);
		background-size: 20px 20px;
		background-position: 10px 15px;
		background-repeat: no-repeat;
		padding: 0px 35px 0px 35px;
	}

	.icon {
		position: absolute;
		top: 55px;
		right: 10px;
	}

	swiper {
		width: 90vw;
		height: 75vh;
	}
	swiper-item{
		border-radius: 8px;
	}
	image {
		width: 90vw;
		height: 75vh;
		border-radius: 8px;
	}
</style>
