<template>
	<view class="content">
		<view class="background-top">
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
		<view class="background-center">
			<view style="font-weight: bold;">常用释义</view>
			<view v-for="(item,index) in dataWord.symbols[0].parts" :key="index">
				<text style="color: gray;">{{item.part}}</text> <text style="margin-left: 10px;"><text v-for="(item,index) in item.means"
					 :key="index">{{item}}；</text></text>
			</view>
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
		<view class="remark">注：SM-2算法 0分-完全没见过 3分-模糊 5分-记忆深刻</view>
		<view class="background-bottom">
			<button type="primary" :plain="true" id="0" class="bottom" style="border-color: #FF0000;color: #FF0000;" @click="WordRating">0</button>
			<button type="primary" :plain="true" id="1" class="bottom" style="border-color: #FF7F50;color: #FF7F50;" @click="WordRating">1</button>
			<button type="primary" :plain="true" id="2" class="bottom" style="border-color: #FFA500;color: #FFA500;" @click="WordRating">2</button>
			<button type="primary" :plain="true" id="3" class="bottom" style="border-color: #9ACD32;color: #9ACD32;" @click="WordRating">3</button>
			<button type="primary" :plain="true" id="4" class="bottom" style="border-color: #3CB371;color: #3CB371;" @click="WordRating">4</button>
			<button type="primary" :plain="true" id="5" class="bottom" style="border-color: #1E90FF;color: #1E90FF;" @click="WordRating">5</button>
		</view>
	</view>
</template>

<script>
	import sm2 from "@/common/sm2.js"
	export default {
		data() {
			return {
				wordList: [],
				dataWord: {},
				wordMP3PNG_EN: '../../static/mp3HL.png',
				wordMP3PNG_AM: '../../static/mp3HL.png',
				innerAudioContext: null,
			}
		},
		onLoad() {
			this.wordList = JSON.parse(uni.getStorageSync('wordList'))
			this.nextWord()
		},
		methods: {
			// 下一个单词
			nextWord(){
				let r = Math.floor(Math.random() * this.wordList.length)
				uni.request({
					url: `https://dict-co.iciba.com/api/dictionary.php?w=${this.wordList[r]}&key=54A9DE969E911BC5294B70DA8ED5C9C4&type=json`,
					success: (res) => {
						// console.log(res.data)
						if (res.data.is_CRI == 1) {
							this.dataWord = res.data
						} else {
							this.nextWord()
						}
					}
				});
			},
			// 单词评分
			WordRating(e){
				let sm2Response = sm2(Number(e.target.id))
				// console.log(response)
				let params = {
					word: this.dataWord.word_name,
					sm2Response: sm2Response
				}
				this.nextWord()
			},
			// 点击播放按钮
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
			}
		}
	}
</script>

<style>
	.content {
		width: 100vw;
		min-height: 100vh;
		/* display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center; */
	}

	.background-top {
		width: 100vw;
		height: 25vh;
		/* background-color: #e16531; */
		background-image: linear-gradient(#e16531, #F5F5F5);
	}
	
	.wordMP3_left {
		height: 12vh;
		margin-left: 3vh;
		font-size: 6vh;
	}
	
	.wordMP3_right {
		margin-left: 3vh;
		display: flex;
		align-items: center;
		color: grey;
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

	.background-center {
		/* width: 100vw; */
		min-height: 61vh;
		padding-left: 3vh;
		background-color: #F5F5F5;
	}

	.remark {
		height: 5vh;
		font-size: 12px;
		color: grey;
		background-color: #F5F5F5;
		padding-left: 1vh;
		display: flex;
		align-items: center;
	}
	
	.background-bottom {
		width: 100vw;
		height: 8vh;
		background-color: #F5F5F5;
		display: flex;
		align-items: center;
	}
	
	.bottom {
		width: 15vw;
	}
</style>
