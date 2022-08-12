<template>
    <div>
        <el-card style="margin-bottom: 20px;">
            <CategorySelect @getCategoryId="getCategoryId" :disabled="!show"></CategorySelect>
        </el-card>
        <el-card>
            <div v-show="scene == 0">
                <!-- 展示Spu列表的结构 -->
                <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加Spu</el-button>
                <el-table style="width:100%;" border :data="records">
                    <el-table-column type="index" label="序号" width="80px" align="center">
                    </el-table-column>
                    <el-table-column prop="spuName" label="SPU名称" width="width">
                    </el-table-column>
                    <el-table-column prop="description" label="SPU描述" width="width">
                    </el-table-column>
                    <el-table-column prop="prop" label="操作" width="width">
                        <template slot-scope="{row,$index}">
                            <hint-button type="primary" icon="el-icon-plus" size="mini" title="添加sku"></hint-button>
                            <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改sku"
                                @click="updateSpu(row)"></hint-button>
                            <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu全部sku列表">
                            </hint-button>
                            <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu"></hint-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- 分页器 -->

                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                    style="margin-top: 20px; text-align: center;" :current-page="page" :page-sizes="[3, 5, 10, 100]"
                    :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total">
                </el-pagination>
            </div>

            <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu"></SpuForm>

            <SkuForm v-show="scene == 2"></SkuForm>
        </el-card>
    </div>
</template>


<script>
import SpuForm from './SpuForm'
import SkuForm from './SkuForm'

export default {
    name: "Spu",
    data() {
        return {
            category1Id: '',
            category2Id: '',
            category3Id: '',
            show: false,
            page: 1,
            limit: 3,
            records: [],
            total: 0,
            scene: 0, // 控制切换DIV 0:列表 1:添加SPU 2:添加SKU

        }
    },

    methods: {
        getCategoryId({ categoryId, level }) {
            if (level == 1) {
                this.category1Id = categoryId
                this.category2Id = ''
                this.category3Id = ''
            }
            else if (level == 2) {
                this.category2Id = categoryId
                this.category3Id = ''
            }
            else {
                this.category3Id = categoryId
                this.getSpuList()
            }
        },
        async getSpuList() {
            const { page, limit, category3Id } = this
            let result = await this.$API.spu.reqSpuList(page, limit, category3Id)
            this.total = result.data.total
            this.records = result.data.records
        },
        handleSizeChange(limit) {
            this.limit = limit
            this.getSpuList()

        },
        // 分页器当前页变化
        handleCurrentChange(page) {
            this.page = page
            this.getSpuList()
        },
        addSpu() {
            this.scene = 1

        },
        updateSpu(row) {
            this.scene = 1
            this.$refs.spu.initSpuData(row)
        },
        changeScene(scene){
            this.scene = scene
        }
    },
    components: {
        SpuForm,
        SkuForm
    }
}


</script>


<style>
</style>