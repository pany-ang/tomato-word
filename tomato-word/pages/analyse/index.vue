<template>
	<view class="content">
		<canvas canvas-id="canvasColumnMeter" id="canvasColumnMeter" class="charts"></canvas>
		<canvas canvas-id="canvasRing" id="canvasRing" class="charts"></canvas>
	</view>
</template>

<script>
	import uCharts from '../../components/u-charts/u-charts.js';
	export default {
		data() {
			return {

			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			getData() {
				wx.cloud.callFunction({
						// 云函数名称
						name: 'getData',
						// 传给云函数的参数
						data: {},
					})
					.then(res => {
						console.log(res.result)
						this.show(res.result.wordType, res.result.wordScore);
					})
					.catch(console.error)
			},
			show(wordType, wordScore) {
				new uCharts({
					$this: this,
					canvasId: 'canvasColumnMeter',
					type: 'column',
					legend: {
						show: true
					},
					fontSize: 11,
					background: '#FFFFFF',
					pixelRatio: 1,
					animation: true,
					categories: ["四级", "六级", "考研", "专八", "软件"],
					series: [{
						"name": "目标值",
						"data": [2895, 2085, 3837, 1938, 500],
						"color": "#2fc25b"
					}, {
						"name": "完成量",
						"data": [wordType.wordType0Length, wordType.wordType1Length, wordType.wordType2Length, wordType.wordType3Length, wordType.wordType4Length],
						"color": "#1890ff"
					}],
					xAxis: {
						disableGrid: true,
					},
					yAxis: {
						//disabled:true
					},
					dataLabel: true,
					width: uni.upx2px(750),
					height: uni.upx2px(500),
					extra: {
						column: {
							//meter参数为“温度计式图表”
							type: 'meter',
							//width为每个柱子的宽度
							width: 25,
							meter: {
								//这个是外层边框（即目标值）的宽度
								border: 2,
								//这个是内部填充颜色
								fillColor: '#E5FDC3'
							}
						}
					}
				});

				let passRate = (((wordScore.wordScore4Length+wordScore.wordScore5Length)/(wordScore.wordScore0Length+wordScore.wordScore1Length+wordScore.wordScore2Length+wordScore.wordScore3Length+wordScore.wordScore4Length+wordScore.wordScore5Length))*100).toFixed(0)
				new uCharts({
					$this: this,
					canvasId: 'canvasRing',
					type: 'ring',
					fontSize: 11,
					legend: true,
					title: {
						name: passRate+'%',
						color: '#7cb5ec',
						fontSize: 25,
						offsetY: -0,
					},
					subtitle: {
						name: '及格率',
						color: '#666666',
						fontSize: 15,
						offsetY: 0,
					},
					extra: {
						pie: {
							offsetAngle: -45,
							ringWidth: 40,
							labelWidth: 15
						}
					},
					background: '#FFFFFF',
					pixelRatio: 1,
					series: [{
						"name": "0分",
						"data": wordScore.wordScore0Length
					}, {
						"name": "1分",
						"data": wordScore.wordScore1Length
					}, {
						"name": "2分",
						"data": wordScore.wordScore2Length
					}, {
						"name": "3分",
						"data": wordScore.wordScore3Length
					}, {
						"name": "4分",
						"data": wordScore.wordScore4Length
					}, {
						"name": "5分",
						"data": wordScore.wordScore5Length
					}],
					animation: true,
					width: uni.upx2px(750),
					height: uni.upx2px(500),
					disablePieStroke: true,
					dataLabel: true,
				});
			}
		}
	}
</script>

<style>
	.content {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-around;
	}

	.charts {
		width: 750upx;
		height: 500upx;
	}
</style>
