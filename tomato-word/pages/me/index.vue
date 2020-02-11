<template>
	<view class="content">
		<view class="background-red"></view>
		<view class="background-gray"></view>
		<view class="logo">
			<image class="logoImg" src="../../static/tomato2.png"></image>
		</view>
		<uni-collapse class="collapse">
			<uni-collapse-item title="选择词典">
				<radio-group @change="radioChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item,index) in items" :key="item.value">
						<view>
							<radio :value="item.value" :checked="index == current" />
						</view>
						<view>{{item.name}}</view>
					</label>
				</radio-group>
			</uni-collapse-item>
			<uni-collapse-item title="软件说明">
				<view class="appExplain">
					<view>开发者：pany</view>
					<view>联系QQ：939630029</view>
					<view>知乎主页：zhuanlan.zhihu.com/panyang</view>
					<view>软件已开源：github.com/pany-ang/tomato-word</view>
				</view>
			</uni-collapse-item>
			<uni-collapse-item title="用户反馈">
				<view>
					<input class="input_issue" type="text" v-model="detail" placeholder="请详细描述你所遇到的问题" />
					<input class="input_QQ" type="text" v-model="contactInfo" placeholder="请留下你的联系方式,如QQ" />
					<button class="button" type="primary" @click="feedback">提交</button>
				</view>
			</uni-collapse-item>
		</uni-collapse>
	</view>
</template>

<script>
	import { wordListCet4 } from '@/common/cet4.js'
	import { wordListCet6 } from '@/common/cet6.js'
	import { wordListKaoyan } from '@/common/kaoyan.js'
	import { wordListZy8 } from '@/common/zy8.js'
	import { wordList500 } from '@/common/500.js'
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {
			uniCollapse,
			uniCollapseItem
		},
		data() {
			return {
				detail: '',
				contactInfo: '',
				items: [{
						value: '四级',
						name: '四级'
					},
					{
						value: '六级',
						name: '六级'
					},
					{
						value: '考研',
						name: '考研'
					},
					{
						value: '专八',
						name: '专八'
					},
					{
						value: '软件',
						name: '软件'
					},
				],
				current: '0'
			}
		},
		onLoad() {
			if (uni.getStorageSync('wordType')) {
				this.current = uni.getStorageSync('wordType');
			}
		},
		methods: {
			radioChange(e) {
				switch (e.detail.value) {
					case '四级':
						uni.setStorageSync('wordType', '0');
						uni.setStorageSync('wordList', JSON.stringify(wordListCet4));
						break;
					case '六级':
						uni.setStorageSync('wordType', '1');
						uni.setStorageSync('wordList', JSON.stringify(wordListCet6));
						break;
					case '考研':
						uni.setStorageSync('wordType', '2');
						uni.setStorageSync('wordList', JSON.stringify(wordListKaoyan));
						break;
					case '专八':
						uni.setStorageSync('wordType', '3');
						uni.setStorageSync('wordList', JSON.stringify(wordListZy8));
						break;
					case '软件':
						uni.setStorageSync('wordType', '4');
						uni.setStorageSync('wordList', JSON.stringify(wordList500));
						break;
					default:
						break;
				}
			},
			feedback() {
				if(this.detail.length!==0 && this.contactInfo.length!==0){
					wx.cloud.callFunction({
							// 云函数名称
							name: 'userFeedback',
							// 传给云函数的参数
							data: {
								detail: this.detail,
								contactInfo: this.contactInfo,
								time: new Date().toLocaleString()
							},
						}).then(res => {
							let than = this;
							uni.showModal({
								content: '提交成功，我会尽快处理你的反馈~',
								showCancel: false,
								success(res) {
									than.detail = '';
									than.contactInfo = '';
								}
							});
						}).catch(console.error)
				}else{
					uni.showModal({
						content: '你还没有留下问题或联系方式~',
						showCancel: false,
						success(res) {
						}
					});
				}
			}
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

	.collapse {
		width: 100vw;
		margin-top: 10vh;
	}

	.appExplain {
		padding-left: 12px;
	}

	.input_issue {
		width: 96%;
		height: 100rpx;
		padding: 18rpx 2%;
		background-color: white;
	}

	.input_QQ {
		width: 96%;
		height: 50rpx;
		margin-top: 1px;
		padding: 18rpx 2%;
		background-color: white;
	}

	.button {
		width: 100%;
		border-radius: 0;
	}
</style>
