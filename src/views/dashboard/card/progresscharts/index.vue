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
                min:0,
                max:100
            },
            yAxis: {
                show: false,
                type: 'category'
            },
            series: [{
                type: 'bar',
                data: [78],
                color:'cyan',
                barWidth:10,
                color:'yellowgreen',
                // beijing色
                showBackground:true,
                backgroundStyle:{
                    color:'#eee'
                },
                label:{
                    show:true,
                    formatter:'|',
                    // 文本标签内容
                    position:'right'
                }
            }],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            
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