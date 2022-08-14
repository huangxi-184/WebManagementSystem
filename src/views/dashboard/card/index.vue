<template>
    <div>
        <el-row :gutter='10'>
            <el-col :span='6'>
                <el-card>
                    <detail title="总销售额" count="￥ 1266">
                        <template slot="charts">
                            <span>
                                1
                                <svg width="20px" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                </svg>
                            </span>
                            <span>2
                                <svg width="20px" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                                </svg>
                            </span>
                        </template>
                        <template slot="footer">
                            <span>日销售额为8888</span>
                        </template>
                    </detail>

                </el-card>
            </el-col>
            <el-col :span='6'>
                <el-card>
                    <detail title="访问量" count="￥ 1266">
                        <template slot="charts">
                            <Linechart></Linechart>
                        </template>
                        <template slot="footer">
                            <span>日销售额为8888</span>
                        </template>
                    </detail>
                </el-card>
            </el-col>
            <el-col :span='6'>
                <el-card>
                    <detail title="支付笔数" count="￥ 1266">
                        <template slot="charts">
                            <Barchart></Barchart>
                        </template>
                        <template slot="footer">
                            <span>日销售额为8888</span>
                        </template>
                    </detail>
                </el-card>
            </el-col>
            <el-col :span='6'>
                <el-card>
                    <detail title="运营活动效果" count="78%">
                        <template slot="charts">
                            <Progresscharts></Progresscharts>
                        </template>
                        <template slot="footer">
                            <span>
                                1
                                <svg width="20px" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                                </svg>
                            </span>
                            <span>2
                                <svg width="20px" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                                </svg>
                            </span>
                        </template>
                    </detail>
                </el-card>
            </el-col>
        </el-row>


    </div>
</template>

<script>
import detail from './detail'
import Linechart from './linechart/index.vue';
import Barchart from './barchart/index.vue';
import Progresscharts from './progresscharts/index.vue';
export default {
    name: "",
    components: {
    detail,
    Linechart,
    Barchart,
    Progresscharts
}

}
</script>

<style  scoped>
</style>
