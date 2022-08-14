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
                type: 'category',
                data:['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
            },
            yAxis: {
                show: false
            },
            series: [{
                type: 'bar',
                data: [10, 7, 33, 12, 88, 9, 56, 23,88, 9, 56, 23],
                color:'yellowgreen'

            }],
            grid: {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            },
            tooltip:{}
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