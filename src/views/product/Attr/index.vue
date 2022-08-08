<template>
    <div>
        <el-card style="margin:20px 0px">
            <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>

        </el-card>
        <el-card>
            <div v-show="isShowTable">
                <el-button type="primary" icon="el-icon-plus" :disabled="category3Id ? false : true" @click='addAttr'>
                    添加属性</el-button>

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
                            <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)">
                            </el-button>
                            <el-button type="danger" icon="el-icon-delete" size="mini">
                            </el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div v-show="!isShowTable">
                <!-- 添加属性 或者修改属性 -->
                <el-form :inline="true" ref="form" :model="attrInfo" label-width="80px">
                    <el-form-item label="属性名">
                        <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
                    </el-form-item>
                </el-form>
                <el-button type="primary" icon="el-icon-plus" @click="addAttrValue" :disabled="!attrInfo.attrName">添加属性值
                </el-button>
                <el-button @click="isShowTable = true">取消</el-button>
                <el-table :data="attrInfo.attrValueList" border style="width: 100%; margin:20px 0px">
                    <el-table-column type="index" label="序号" width="80px" align="center">
                    </el-table-column>
                    <el-table-column prop="prop" label="属性值名称" width="width">
                        <template slot-scope='{row,$index}'>
                            <el-input v-if="row.flag" v-model="row.valueName" placeholder="请输入属性值名称" size="mini"
                                @blur="toLook(row)" @keyup.native.enter="toLook(row)"></el-input>
                            <span v-else @click="row.flag = true" style="display: block;">{{ row.valueName }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="prop" label="操作" width="width">
                        <template slot-scope='{row,$index}'>
                            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary">保存</el-button>
                <el-button @click="isShowTable = true">取消</el-button>
            </div>

        </el-card>
    </div>
</template>


<script>
import cloneDeep from 'lodash/cloneDeep' // 按需引入lodash

export default {
    name: "Attr",
    data() {
        return {
            category1Id: '',
            category2Id: '',
            category3Id: '',
            attrList: [],
            isShowTable: true, // 控制表格的显示与隐藏
            //收集新增属性和修改属性的值
            attrInfo: {
                attrName: "",
                attrValueList: [

                ],
                categoryId: 0, //  三级分类的ID 对象中属性执行时间顺序不定
                categoryLevel: 3,
            },



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
        addAttrValue() {
            // 向数组里面推元素
            this.attrInfo.attrValueList.push(
                {
                    attrId: this.attrInfo.id,
                    valueName: '',
                    flag: true,
                }
            )
        },
        // 添加属性值的回调
        addAttr() {
            this.isShowTable = false
            this.attrInfo = {
                attrName: "",
                attrValueList: [

                ],
                categoryId: this.category3Id, //  三级分类的ID 对象中属性执行时间顺序不定
                categoryLevel: 3,
            }
        },
        // 将数据发送给
        updateAttr(row) {
            this.isShowTable = false
            // 数据对象里面有数组 数组里面有对象 所以需要进行深拷贝 引入lodash 实现深拷贝
            this.attrInfo = cloneDeep(row)
        },
        toLook(row) {
            if (row.valueName.trim() == '') {
                this.$message({
                    message: "请输入一个合法的属性值",
                    type: ""
                })

                return
            }
            let isRepat = this.attrInfo.attrValueList.some((item) => {
                if (row !== item) {
                    return row.valueName == item.valueName
                }
            })
            if (isRepat) {
                this.$message({
                    message: "平台属性值重复",
                    type: ""
                }
                )
                return
            }
            // 新增的属性值 不能与已有的属性值重复
            row.flag = false
        }


    }



}


</script>


<style>
</style>