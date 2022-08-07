<template>
    <div>
        <el-card style="margin:20px 0px">
            <CategorySelect @getCategoryId="getCategoryId"></CategorySelect>

        </el-card>
        <el-card></el-card>
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

            }
        },
        



    }



}


</script>


<style>
</style>