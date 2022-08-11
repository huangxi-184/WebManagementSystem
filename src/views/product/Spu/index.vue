<template>
    <div>
        <el-card style="margin-bottom: 20px;">
            <CategorySelect @getCategoryId="getCategoryId" :disabled="!show"></CategorySelect>
        </el-card>
        <el-card>
            <div>
                <!-- 展示Spu列表的结构 -->
                <el-button type="primary" icon="el-icon-plus">添加Spu</el-button>
                <el-table style="width:100%;" border :date="records">
                    <el-table-column type="index" label="序号" width="80px" align="center">
                    </el-table-column>
                    <el-table-column prop="prop" label="Spu名称" width="width">
                    </el-table-column>
                    <el-table-column prop="prop" label="Spu描述" width="width">
                    </el-table-column>
                    <el-table-column prop="prop" label="操作" width="width">
                        <template slot-scope="{row,$index}">
                            <el-button type="primary" icon="el-icon-plus" size="mini"></el-button>
                            <el-button type="warning" icon="el-icon-edit" size="mini"></el-button>
                            <el-button type="info" icon="el-icon-info" size="mini"></el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        </template>
                    </el-table-column>
                </el-table>

            </div>
        </el-card>
    </div>
</template>


<script>
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
    },
    async getSpuList() {
        const { page, limit, category3Id } = this
        let result = await this.$API.spu.reqSpuList(page, limit, category3Id)
        this.total = result.data.total
        this.records = result.data.records
    },
    handleSizeChange() {
        console.log(11)
    },
    handleCurrentChange() {
        console.log(11)
    }
}


</script>


<style>
</style>