<template>
	<view class="content">
		<view class="background-red"></view>
		<view class="background-gray"></view>
		<view class="logo">
			<image class="logoImg" src="../../static/tomato2.png"></image>
		</view>
		<view class="top">
			<input class="input" type="text" v-model="value" placeholder="请输入需要翻译的单词" maxlength="-1" confirm-type="search"
			 @input="input" @confirm="search" />
			<icon class="icon" type="clear" size="20" v-show="showFlag" @click="clear" />
		</view>
		<view class="center">
			<navigator url="/pages/study/index" hover-class="none">
				<view class="recite">
					<image class="reciteImg" src="../../static/recite.png"></image>
					<text>背单词</text>
				</view>
			</navigator>
			<navigator url="/pages/review/index" hover-class="none">
				<view class="review">
					<image class="reviewImg" src="../../static/review.png"></image>
					<text>复习</text>
				</view>
			</navigator>
			<navigator url="/pages/analyse/index" hover-class="none">
				<view class="analyse">
					<image class="reviewImg" src="../../static/analyseIndex.png"></image>
					<text>分析</text>
				</view>
			</navigator>
		</view>
		<view class="bottom">
			<image class="mp3" @click="changeMP3PNG" :src="MP3PNG"></image>
			<swiper :indicator-dots="true" :autoplay="false" :interval="3000" :duration="1000" indicator-color="rgba(255, 255, 255, 0.3)"
			 indicator-active-color="#FFFFFF" @change="changeCurrent">
				<swiper-item v-for="(item,index) in dataPNG" :key="index">
					<image class="png" :src="item"></image>
				</swiper-item>
			</swiper>
		</view>
		<uni-popup ref="popup" type="center">
			<view class="popup">
				<view class="wordMP3">
					<view class="wordMP3_left">
						<text>{{dataWord.word_name}}</text>
					</view>
					<view class="wordMP3_right">
						<view class="wordMP3_EN">
							<text>英 [{{dataWord.symbols[0].ph_en}}]</text>
							<image id="en" class="wordMP3_IMG" :src="wordMP3PNG_EN" @click="changeWordMP3PNG"></image>
						</view>
						<view class="wordMP3_AM">
							<text>美 [{{dataWord.symbols[0].ph_am}}]</text>
							<image id="am" class="wordMP3_IMG" :src="wordMP3PNG_AM" @click="changeWordMP3PNG"></image>
						</view>
					</view>
				</view>
				<view class="wordTranslation">
					<view style="font-weight: bold;">常用释义</view>
					<view v-for="(item,index) in dataWord.symbols[0].parts" :key="index">
						<text style="color: gray;">{{item.part}}</text> <text style="margin-left: 10px;"><text v-for="(item,index) in item.means"
							 :key="index">{{item}}；</text></text>
					</view>
				</view>
				<view class="wordSupplement">
					<view style="font-weight: bold;color: black;">补充</view>
					<view v-if="dataWord.exchange.word_pl">
						<text>复数：</text><text>{{dataWord.exchange.word_pl[0]}}</text>
					</view>
					<view v-if="dataWord.exchange.word_past">
						过去式：</text><text>{{dataWord.exchange.word_past[0]}}</text>
					</view>
					<view v-if="dataWord.exchange.word_done">
						<text>过去分词：</text><text>{{dataWord.exchange.word_done[0]}}</text>
					</view>
					<view v-if="dataWord.exchange.word_ing">
						现在分词：</text><text>{{dataWord.exchange.word_ing[0]}}</text>
					</view>
					<view v-if="dataWord.exchange.word_third">
						<text>第三人称单数：</text><text>{{dataWord.exchange.word_third[0]}}</text>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from "@/components/uni-popup/uni-popup.vue"
	export default {
		components: {
			uniPopup
		},
		data() {
			return {
				value: '',
				showFlag: false,
				dataPNG: [

				],
				dataMP3: [

				],
				MP3PNG: '../../static/mp3.png',
				wordMP3PNG_EN: '../../static/mp3HL.png',
				wordMP3PNG_AM: '../../static/mp3HL.png',
				innerAudioContext: null,
				current: 0,
				dataWord: {

				}
			}
		},
		onLoad() {

		},
		onShow() {
			// 排序
			for (let i = 0; i < getApp().globalData.dataTime.length - 1; i++) {
				for (let j = i + 1; j < getApp().globalData.dataTime.length; j++) {
					if (getApp().globalData.dataTime[i] < getApp().globalData.dataTime[j]) {
						let t1 = getApp().globalData.dataTime[i]
						getApp().globalData.dataTime[i] = getApp().globalData.dataTime[j]
						getApp().globalData.dataTime[j] = t1
						let t2 = getApp().globalData.dataMP3[i]
						getApp().globalData.dataMP3[i] = getApp().globalData.dataMP3[j]
						getApp().globalData.dataMP3[j] = t2
						let t3 = getApp().globalData.dataPNG[i]
						getApp().globalData.dataPNG[i] = getApp().globalData.dataPNG[j]
						getApp().globalData.dataPNG[j] = t3
					}
				}
			}
			// 渲染
			this.dataPNG = getApp().globalData.dataPNG
			this.dataMP3 = getApp().globalData.dataMP3
		},
		methods: {
			// 点击搜索按钮
			search(e) {
				e.detail.value = e.detail.value.toLowerCase() // 搜索前先转化为小写
				uni.request({
					url: `https://dict-co.iciba.com/api/dictionary.php?w=${e.detail.value}&key=54A9DE969E911BC5294B70DA8ED5C9C4&type=json`,
					success: (res) => {
						console.log(res.data)
						if (res.data.is_CRI == 1) {
							this.dataWord = res.data
							this.$refs.popup.open()
						} else {
							uni.showModal({
								content: '非常抱歉，触及到我的翻译盲区啦~',
								showCancel: false
							});
						}
					}
				});
			},
			// 输入
			input(e) {
				console.log(e.detail.value)
				if (e.detail.value.length > 0) {
					this.showFlag = true
				} else {
					this.showFlag = false
				}
			},
			// 清空输入框
			clear() {
				this.value = ''
				this.showFlag = false
			},
			// 点击播放按钮（每日一句）
			changeMP3PNG() {
				if (this.innerAudioContext === null) {
					this.innerAudioContext = uni.createInnerAudioContext();
					this.innerAudioContext.src = this.dataMP3[this.current];
					this.innerAudioContext.onPlay(() => {
						this.MP3PNG = '../../static/mp3HL.png'
					});
					this.innerAudioContext.onEnded(() => {
						this.MP3PNG = '../../static/mp3.png'
						this.innerAudioContext = null;
					})
					this.innerAudioContext.play();
				} else {
					this.innerAudioContext.stop();
					this.MP3PNG = '../../static/mp3.png';
					this.innerAudioContext = null;
				}
			},
			// 点击播放按钮（单词发音）
			changeWordMP3PNG(e) {
				if (this.innerAudioContext === null) {
					this.innerAudioContext = uni.createInnerAudioContext();
					if (e.target.id === 'en') {
						this.innerAudioContext.src = this.dataWord.symbols[0].ph_en_mp3;
						this.innerAudioContext.onPlay(() => {
							this.wordMP3PNG_EN = '../../static/mp3HLHL.png'
						});
						this.innerAudioContext.onEnded(() => {
							this.wordMP3PNG_EN = '../../static/mp3HL.png'
							this.innerAudioContext = null;
						})
						this.innerAudioContext.play();
					} else if (e.target.id === 'am') {
						this.innerAudioContext.src = this.dataWord.symbols[0].ph_am_mp3;
						this.innerAudioContext.onPlay(() => {
							this.wordMP3PNG_AM = '../../static/mp3HLHL.png'
						});
						this.innerAudioContext.onEnded(() => {
							this.wordMP3PNG_AM = '../../static/mp3HL.png'
							this.innerAudioContext = null;
						})
						this.innerAudioContext.play();
					}
				}
			},
			// 改变轮播图current
			changeCurrent(e) {
				this.current = e.detail.current
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
		width: 64px;
		height: 64px;
	}

	.top {
		width: 90vw;
		position: relative;
	}

	.input {
		height: 50px;
		font-size: 16px;
		margin-top: 0px;
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
		top: 15px;
		right: 10px;
	}

	.center {
		width: 90vw;
		height: 7vh;
		display: flex;
		justify-content: space-between;
	}

	.recite,
	.review,
	.analyse {
		width: 28vw;
		height: 7vh;
		font-size: 2.5vh;
		color: white;
		background-color: rgba(240, 240, 240, .2);
		border-radius: 8px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.reciteImg,
	.reviewImg {
		width: 5vh;
		height: 5vh;
		margin-right: 1vw;
	}

	.bottom {
		width: 90vw;
		height: 60vh;
		position: relative;
		overflow: hidden;
		border-radius: 8px;
	}

	swiper {
		width: 90vw;
		height: 60vh;
	}

	.mp3 {
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
	}

	.popup {
		width: 90vw;
		/* height: 50vh; */
		background-color: #F5F5F5;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* align-items: center; */
		border-radius: 8px;
	}

	.wordMP3 {
		width: 90vw;
		background-color: #FFFFFF;
		border-radius: 8px 8px 0px 0px;
	}

	.wordMP3_left {
		margin-left: 3vh;
		font-size: 4vh;
	}

	.wordMP3_right {
		margin-left: 3vh;
		display: flex;
		align-items: center;
	}

	.wordMP3_EN {
		display: flex;
		align-items: center;
	}

	.wordMP3_AM {
		margin-left: 10px;
		display: flex;
		align-items: center;
	}

	.wordMP3_IMG {
		width: 3vh;
		height: 3vh;
		margin-left: 5px;
	}

	.wordTranslation {
		margin-top: 5px;
		margin-left: 3vh;
	}

	.wordSupplement {
		margin-top: 5px;
		margin-left: 3vh;
		border-radius: 0px 0px 8px 8px;
		color: gray;
	}
</style>
