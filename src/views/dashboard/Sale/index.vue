<template>
    <el-card class="box-card" style="margin:10px 0px">
        <div slot="header" class="clearfix">
            <!-- 头部左侧 -->
            <el-tabs class="tab" v-model="activeName">
                <!-- " @tab-click="handleClick" -->
                <el-tab-pane label="销售额" name="销售额"></el-tab-pane>
                <el-tab-pane label="访问量" name="访问量"></el-tab-pane>
            </el-tabs>
            <div class="right">
                <span>今日</span>
                <span>本周</span>
                <span>本月</span>
                <span>本年</span>
                <el-date-picker class="date" type="daterange" range-separator="-" start-placeholder="开始日期"
                    end-placeholder="结束日期" size="mini">
                </el-date-picker>
            </div>
        </div>
        <!-- // body -->
        <div>
            <el-row :gutter="10">
                <el-col :span='18'>
                    <div class="charts">
                        <Barchart></Barchart>
                    </div>
                </el-col>
                <el-col :span='6' class="right">
                    <h3>门店销售额排名</h3>
                    <ul>
                        <li>
                            <span class="rindex">0</span>
                            <span>肯德基</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li><span class="rindex">1</span>
                            <span>肯德基</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li><span class="rindex">2</span>
                            <span>肯德基</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li><span class="rindex">3</span>
                            <span>肯德基</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li><span>4</span>
                            <span>肯德基</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li><span>5</span>
                            <span>肯德基</span>
                            <span class="rvalue">123456</span>
                        </li>
                        <li><span>6</span>
                            <span>肯德基</span>
                            <span class="rvalue">123456</span>
                        </li>
                    </ul>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script>
import Barchart from "../card/barchart/index.vue"
export default {
    name: "",
    data() {
        return {
            activeName: "销售额",
        };
    },
    components: {
        Barchart,
    }
}
</script>



<style scoped>
.clearfix {
    position: relative;
    display: flex;
    justify-content: space-between;
}

.tab {
    width: 100%
}

.right {
    position: absolute;
    right: 0px;
}

.date {
    width: 200px;
    margin: 0px 20px;
}

.right span {
    margin: 0px 10px;
}

.charts {
    width: 100%;
    height: 300px;
}

ul {
    list-style: none;
    width: 100%;
    height: 300px;
    padding: 0px;
}

ul li {
    height: 8%;
    margin: 10px 0px;
}

.rindex {
    float: left;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: black;
    color: white;
    text-align: center;
}

.rvalue {
    float: right;
}
</style>