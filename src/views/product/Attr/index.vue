<template>
    <div>
        <el-card style="margin:20px 0px">
            <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>

        </el-card>
        <el-card>
            <div v-show="isShowTable">
                <el-button type="primary" icon="el-icon-plus" :disabled="category3Id ? false : true"
                    @click='isShowTable = false'>添加属性</el-button>
                <el-table :data="attrList" border style="width: 100%">

                    <el-table-column type="index" label="序号" width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="attrName" label="属性名称" width="150">
                    </el-table-column>
                    <el-table-column prop="tmName" label="属性值列表">
                        <template slot-scope="{row,$index}">
                            <el-tag type="success" v-for="(tag, index) in row.attrValueList" :key="tag.id"
                                style="margin:0px 20px">{{ tag.valueName }}</el-tag>
                            <!-- /static/default.jpg 是直接放在public下的static文件夹中 static可以不写./ 只写/ -->
                        </template>
                    </el-table-column>
                    <el-table-column prop="tmName" label="操作" width="150">
                        <template slot-scope="{row,$index}">
                            <el-button type="warning" icon="el-icon-edit" size="mini" @click="isShowTable = false">
                            </el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="!isShowTable">
                <!-- 添加属性 或者修改属性 -->
                <el-form :inline="true" ref="form" :model="cForm" label-width="80px">
                    <el-form-item label="属性名">
                        <el-input placeholder="请输入属性名"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" icon="el-icon-plus" >添加属性值</el-button>
                <el-button @click="isShowTable = true">取消</el-button>
                <el-table :data="tableData" border style="width: 100%; margin:20px 0px">
                    <el-table-column type="index" label="序号" width="80px" align="center">
                    </el-table-column>
                    <el-table-column prop="prop" label="属性值名称" width="width">
                    </el-table-column>
                    <el-table-column prop="prop" label="操作" width="width">
                    </el-table-column>
                </el-table>
                <el-button type="primary" >保存</el-button>
                <el-button @click="isShowTable = true">取消</el-button> 
            </div>

        </el-card>
    </div>
</template>


<script>
export default {
    name: "Attr",
    data() {
        return {
            category1Id: '',
            category2Id: '',
            category3Id: '',
            attrList: [],
            isShowTable: false, // 控制表格的显示与隐藏

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
                this.getAttrList()
            }
        },

        async getAttrList() {
            const { category1Id, category2Id, category3Id } = this
            let reslut = await this.$API.attr.reqAttrList(category1Id, category2Id, category3Id)
            this.attrList = reslut.data
        },


    }



}


</script>


<style>
</style>