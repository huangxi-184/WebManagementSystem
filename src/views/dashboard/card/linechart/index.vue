<template>
    <div class="charts" ref="charts">

    </div>
</template>


<script>
import echarts from 'echarts'
export default {
    name: '',
    mounted() {
        // 初始echarts 实例
        let lineCharts = echarts.init(this.$refs.charts)
        lineCharts.setOption({
            xAxis: {
                show: false,
                type: 'category'
            },
            yAxis: {
                show: false
            },
            series: [{
                type: 'line',
                data: [10, 7, 33, 12, 88, 9, 56, 23],
                symbol: 'none', //去掉折线图中的节点
                smooth: true,  //true 为平滑曲线，false为
                // 拐点去掉
                itemStyle: {
                    opacity: 0
                },
                lineStyle: {
                    color: "purple"
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(
                            0, 0, 0, 1,
                            [
                                { offset: 0, color: 'red' },
                                { offset: 0.5, color: 'pink' },
                                { offset: 1, color: '#ddd' }
                            ]
                        )
                    }
                }
            }],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        })
    }
}

</script>

<style scoped>
.charts {
    width: 100%;
    height: 100%;
}
</style>