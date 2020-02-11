<script>
	import { wordListCet4 } from '@/common/cet4.js'
	export default {
		globalData: {
			dataPNG: [],
			dataMP3: [],
			dataTime: []
		},
		onLaunch: function() {
			const dateNow = +new Date()
			let dateArr = [
				(new Date(dateNow)),
				(new Date(dateNow - 3600 * 1000 * 24 * 1)),
				(new Date(dateNow - 3600 * 1000 * 24 * 2)),
				(new Date(dateNow - 3600 * 1000 * 24 * 3)),
				(new Date(dateNow - 3600 * 1000 * 24 * 4)),
				(new Date(dateNow - 3600 * 1000 * 24 * 5)),
				(new Date(dateNow - 3600 * 1000 * 24 * 6))
			];
			for (let i = 0; i < dateArr.length; i++) {
				let time = dateArr[i];
				let YY = time.getFullYear()
				let MM = (time.getMonth() + 1) < 10 ? ('0' + (time.getMonth() + 1)) : (time.getMonth() + 1)
				let DD = time.getDate() < 10 ? ('0' + time.getDate()) : time.getDate()
				dateArr[i] = YY + '-' + MM + '-' + DD
			}
			for (let i = 0; i < dateArr.length; i++) {
				uni.request({
					url: `https://open.iciba.com/dsapi/?date=${dateArr[i]}`,
					success: (res) => {
						this.$scope.globalData.dataPNG.push(res.data.fenxiang_img)
						this.$scope.globalData.dataMP3.push(res.data.tts)
						this.$scope.globalData.dataTime.push(dateArr[i])
						// console.log(dateArr[i])
					}
				});
			}
		},
		onShow: function() {
			// 默认本地词库为Cet4
			uni.setStorageSync('wordList', JSON.stringify(wordListCet4));
			// 初始云开发
			wx.cloud.init()
		},
		onHide: function() {
			
		}
	}
</script>

<style>
	/*每个页面公共css */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
</style>
