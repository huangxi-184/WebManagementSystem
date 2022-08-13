<template>
    <div>
        <el-form :model="spu" ref="form" label-width="80px">
            <el-form-item label="SPU名称">
                <el-input v-model="spu.spuName"></el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <el-select v-model="spu.tmId" placeholder="请选择品牌">
                    <el-option :label="tm.tmName" :value="tm.id" v-for="(tm, index) in tradeMarkList" :key='tm.id'>
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input v-model="spu.description" type="textarea" rows="4" placeholder="描述"></el-input>
            </el-form-item>
            <el-form-item label="SPU图片">
                <el-upload action="/dev-api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :file-list="spuImageList">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="销售属性 ">
                <el-select :placeholder="`还有${unSelectSaleAttr.length}未选择`" v-model="attrId">
                    <el-option :label="unselect.name" :value="unselect.id" v-for="(unselect, index) in unSelectSaleAttr"
                        :key="unselect.id"></el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" :disabled="!attrId">添加销售属性</el-button>
                <el-table style="width:100%;" border :data="spu.spuSaleAttrList">
                    <el-table-column type="index" label="序号" width="80px" align="center">
                    </el-table-column>
                    <el-table-column prop="saleAttrName" label="属性名" width="120px">
                    </el-table-column>
                    <el-table-column prop="description" label="属性名称列表" width="width">
                        <template slot-scope="{row,$index}">
                            <el-tag :key="tag.id" v-for="tag in row.spuSaleAttrValueList" closable
                                :disable-transitions="false" @close="handleClose(tag)">
                                {{ tag.saleAttrValueName }}
                            </el-tag>
                            <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue"
                                ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新Tag
                            </el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="prop" label="操作" width="width">
                        <template slot-scope="{row,$index}">
                            <el-button type="danger" size="small">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">保存
                </el-button>
                <el-button @click="$emit('changeScene', 0)">取消</el-button>
                <!-- $emit,让父组件监听到自定义事件 。 -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "SpuForm",
    data() {
        return {
            inputVisible: false,
            inputValue: '',
            dialogImageUrl: '',
            dialogVisible: false,
            spu: {               
                description: "",
                spuImageList: [],
                spuName: "",
                spuSaleAttrList: [],
                tmId: 0,
            },
            attrId: '',
            // 存储SPU信息属性
            tradeMarkList: [],
            spuImageList: [],//存储SPU的图片数据
            saleAttrList: [],
        };
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        async initSpuData(row) {
            // 获取SPU 信息的数据
            let spuResult = await this.$API.spu.reqSpu(row.id)
            this.spu = spuResult.data
            console.log(this.spu)
            // 获取品牌信息
            let tradeMarkResult = await this.$API.spu.reqTradeMarkList()
            this.tradeMarkList = tradeMarkResult.data
            console.log(this.tradeMarkList)
            // 获取spu图片的数据
            let spuImageResult = await this.$API.spu.reqSpuImageList(row.id)
            // 有图片和路径的
            let ImageList = spuImageResult.data

            ImageList.forEach((item) => {
                item.name = item.imgName
                item.url = item.imgUrl
            })
            this.spuImageList = ImageList
            console.log(this.spuImageList)

            // 获取平台全部的销售属性
            let saleResult = await this.$API.spu.reqBaseSaleAttrList()
            this.saleAttrList = saleResult.data
            console.log(this.saleAttrList)
        },
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        }
    },
    computed: {
        // 计算还未选择的销售属性
        unSelectSaleAttr() {
            let result = this.saleAttrList.filter((item) => {
                return this.spu.spuSaleAttrList.every(item1 => {
                    return item.name != item1.saleAttrName
                })
            })
            console.log('@@@',result)
            return result
        }
    }
}

</script>


<style scoped>
.el-tag+.el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>