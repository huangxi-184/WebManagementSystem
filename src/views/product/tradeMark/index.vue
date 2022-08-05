<template>
    <div>
        <el-button type="primary" icon="el-icon-plus" style="margin:10px 0px" @click="showDialog">添加</el-button>
        <!-- data 是数组类型
        width 是列数 需要的加上 不加上的会平分下面的
        align 对其方式 
        rop="tmName" 不需要加前缀-->
        <el-table :data="list" border style="width: 100%">
            <el-table-column type="index" label="序号" width="80" align="center">
            </el-table-column>
            <el-table-column prop="tmName" label="品牌名称">
            </el-table-column>
            <el-table-column prop="address" label="品牌logo">
                <template slot-scope="{row,$index}">
                    <img :src="row.logoUrl" alt="" style="width: 80px;height:80px" />
                    <!-- /static/default.jpg 是直接放在public下的static文件夹中 static可以不写./ 只写/ -->
                </template>
            </el-table-column>
            <el-table-column prop="address" label="操作">
                <template slot-scope="{row,$index}">
                    <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateDialog">修改</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器 -->

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            style="margin-top: 20px; text-align: center;" :current-page="page" :page-sizes="[3, 5, 10, 100]"
            :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total">
        </el-pagination>
        <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
            <el-form :model="form" style="width:80%">
                <el-form-item label="品牌名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="品牌LOGO" :label-width="formLabelWidth">
                    <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过2MB</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>


<script>
export default {
    name: "tradeMark",
    data() {
        return {
            page: 1,
            limit: 3,
            total: 0,
            list: [],
            dialogFormVisible: false,
            form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
            },
            imageUrl: '',
            formLabelWidth: '120px'

        }
    },
    methods: {
        handleSizeChange(val) {
            this.limit = val
            this.getPageList()
        },
        handleCurrentChange(pager) {
            this.page = pager
            this.getPageList()
        },
        async getPageList() {
            const { page, limit } = this
            let result = await this.$API.tradeMark.reqTradeMarkList(this.page, this.limit)
            console.log(result)
            if (result.code == 200) {
                this.total = result.data.total
                this.list = result.data.records
            }
        },
        showDialog() {
            this.dialogFormVisible = true
        },
        updateDialog() {
            this.dialogFormVisible = true
        },
         handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }

    },

    mounted() {
        this.getPageList()
    }
}

</script>


<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}

.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>