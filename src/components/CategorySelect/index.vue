<template>
    <div>
        <!-- :inline 表示行类表单 -->
        <el-form :inline="true" class="demo-form-inline" :model="cForm">
            <el-form-item label="一级分类" :disabled="show">
                <el-select placeholder="请选择" v-model="cForm.Category1Id" @change="handler1" :disabled="show">
                    <el-option :label="c1.name" :value="c1.id" v-for="(c1, index) in list1" :key="c1.id"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类" :disabled="show" >
                <el-select placeholder="请选择" v-model="cForm.Category2Id" @change="handler2" :disabled="show">
                    <el-option :label="c2.name" :value="c2.id" v-for="(c2, index) in list2" :key="c2.id"> </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类" :disabled="show">
                <el-select placeholder="请选择" v-model="cForm.Category3Id" @change="handler3" :disabled="show">
                    <el-option :label="c3.name" :value="c3.id" v-for="(c3, index) in list3" :key="c3.id"> </el-option>
                </el-select>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
export default {
    name: "CategorySelect",
    props:['show'],
    data() {
        return {
            list1: [],
            list2: [],
            list3: [],
            cForm: {
                Category1Id: '',
                Category2Id: '',
                Category3Id: '',
            }

        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
        async getCategory1List() {
            let reslut = await this.$API.attr.reqCategory1List()
            if (reslut.code == 200) {
                this.list1 = reslut.data

            }
        },
        //一级分类的select的事件回调 
        async handler1() {
            this.list2 = []
            this.list3 = []
            this.cForm.Category2Id = ''
            this.cForm.Category3Id = ''
            const { Category1Id } = this.cForm
            this.$emit('getCategoryId', {categoryId:Category1Id,level:1})
            let reslut = await this.$API.attr.reqCategory2List(Category1Id)
            this.list2 = reslut.data
        },
        async handler2() {
            this.list3 = []
            this.cForm.Category3Id = ''
            const { Category2Id } = this.cForm
            this.$emit('getCategoryId',  {categoryId:Category2Id,level:2})
            let reslut = await this.$API.attr.reqCategory3List(Category2Id)
            this.list3 = reslut.data
        },
        async handler3() {
            const { Category3Id } = this.cForm
            this.$emit('getCategoryId', {categoryId:Category3Id,level:3})
        },


    },
    mounted() {
        this.getCategory1List()
        
    },

}

</script>

<Style>



</Style>
