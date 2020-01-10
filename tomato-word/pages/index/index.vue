<template>
	<view class="content">
		<view class="background-red"></view>
		<view class="background-gray"></view>
		<view class="top">
			<input class="input" type="text" v-model:value="value" placeholder="请输入需要翻译的单词" maxlength="-1" confirm-type="search" @input="input" @confirm="search" />
			<icon class="icon" type="clear" size="20" v-show="showFlag" @click="clear" />
		</view>
		<view class="bottom">
			<image class="mp3" @click="changeMP3PNG" :src="MP3PNG"></image>
			<swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000" indicator-color="rgba(255, 255, 255, 0.3)" indicator-active-color="#FFFFFF">
				<swiper-item v-for="(item,index) in dataPNG" :key="index">
					<image class="png" :src="item"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				value: '',
				showFlag: false,
				dataPNG: [
					'https://edu-wps.ks3-cn-beijing.ksyun.com/image/8b62e725f61ee233edaeda57c0a61c61.png',
					'https://edu-wps.ks3-cn-beijing.ksyun.com/image/8b62e725f61ee233edaeda57c0a61c61.png',
					'https://edu-wps.ks3-cn-beijing.ksyun.com/image/8b62e725f61ee233edaeda57c0a61c61.png',
					'https://edu-wps.ks3-cn-beijing.ksyun.com/image/8b62e725f61ee233edaeda57c0a61c61.png',
					'https://edu-wps.ks3-cn-beijing.ksyun.com/image/8b62e725f61ee233edaeda57c0a61c61.png',
					'https://edu-wps.ks3-cn-beijing.ksyun.com/image/8b62e725f61ee233edaeda57c0a61c61.png',
					'https://edu-wps.ks3-cn-beijing.ksyun.com/image/8b62e725f61ee233edaeda57c0a61c61.png',
				],
				dataMP3: [
					'https://edu-wps.ks3-cn-beijing.ksyun.com/audio/c8bc80da3610e09dfe40691968e70219.mp3',
					'https://edu-wps.ks3-cn-beijing.ksyun.com/audio/c8bc80da3610e09dfe40691968e70219.mp3',
					'https://edu-wps.ks3-cn-beijing.ksyun.com/audio/c8bc80da3610e09dfe40691968e70219.mp3',
					'https://edu-wps.ks3-cn-beijing.ksyun.com/audio/c8bc80da3610e09dfe40691968e70219.mp3',
					'https://edu-wps.ks3-cn-beijing.ksyun.com/audio/c8bc80da3610e09dfe40691968e70219.mp3',
					'https://edu-wps.ks3-cn-beijing.ksyun.com/audio/c8bc80da3610e09dfe40691968e70219.mp3',
					'https://edu-wps.ks3-cn-beijing.ksyun.com/audio/c8bc80da3610e09dfe40691968e70219.mp3',
				],
				MP3PNG: '../../static/mp3.png',
				innerAudioContext: null
			}
		},
		onLoad() {

		},
		onShow() {
			this.dataPNG = getApp().globalData.dataPNG
			this.dataMP3 = getApp().globalData.dataMP3
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
			},
			changeMP3PNG() {
				if(this.innerAudioContext === null){
					this.innerAudioContext = uni.createInnerAudioContext();
					this.innerAudioContext.src = 'https://edu-wps.ks3-cn-beijing.ksyun.com/audio/c8bc80da3610e09dfe40691968e70219.mp3';
					this.innerAudioContext.onPlay(() => {
						this.MP3PNG = '../../static/mp3HL.png'
					});
					this.innerAudioContext.onEnded(()=>{
						this.MP3PNG = '../../static/mp3.png'
					})
					this.innerAudioContext.play();
				}else{
					this.innerAudioContext.stop();
					this.MP3PNG = '../../static/mp3.png';
					this.innerAudioContext = null;
				}
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
	
	.bottom{
		width: 90vw;
		height: 75vh;
		position: relative;
	}
	
	swiper {
		width: 90vw;
		height: 75vh;
	}
	
	.mp3{
		width: 20px;
		height: 20px;
		position: absolute;
		top: 30px;
		right: 20px;
		z-index: 1;
	}
	
	.png {
		width: 90vw;
		height: 75vh;
		border-radius: 8px;
	}
</style>
