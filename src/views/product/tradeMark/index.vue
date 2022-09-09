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
                    <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateDialog(row)">修改</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="deletetradeMark(row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 分页器 -->

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            style="margin-top: 20px; text-align: center;" :current-page="page" :page-sizes="[3, 5, 10, 100]"
            :page-size="limit" layout="prev, pager, next, jumper,->,sizes,total" :total="total">
        </el-pagination>

        <!-- 弹窗-->
        <!-- Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，
        并将 Form-Item 的 prop 属性设置为需校验的字段名即可。 -->
        <el-dialog :title="form.id ? '修改品牌' : '添加品牌'" :visible.sync="dialogFormVisible" @closed='clearformdata'>
            <el-form :model="form" style="width:80%" :rules="rules" ref="ruleFrom">
                <el-form-item label="品牌名称" :label-width="formLabelWidth" prop="tmName">
                    <el-input v-model="form.tmName" autocomplete="off"></el-input>
                </el-form-item>
                <!-- action 图片上传的地址 有专门的接口-->
                <el-form-item label="品牌LOGO" :label-width="formLabelWidth" prop="logoUrl">
                    <el-upload class="avatar-uploader" action="/dev-api/admin/product/fileUpload"
                        :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                        <img v-if="form.logoUrl" :src="form.logoUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过2MB</div>
                    </el-upload>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOrUpdateTradeMark">确 定</el-button>
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
                tmName: '',
                logoUrl: ''
            },

            formLabelWidth: '120px',
            rules: {
                tmName: [
                    { required: true, message: '请输入品牌名称', trigger: 'blur' },
                    { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
                ],
                logoUrl: [
                    { required: true, message: '请选择品牌图片' }
                ],

            },

        }
    },
    methods: {
        handleSizeChange(val) {
            this.limit = val
            this.getPageList()
        },
        handleCurrentChange(pager) {
            this.page = pager
            this.getPageList(pager)
        },

        async getPageList(pager = 1) {
            this.page = pager
            const { page, limit } = this

            let result = await this.$API.tradeMark.reqTradeMarkList(page, limit)

            if (result.code == 200) {
                this.total = result.data.total
                this.list = result.data.records
            }

        },
        showDialog() {
            this.dialogFormVisible = true
        },
        updateDialog(row) {
            this.dialogFormVisible = true
            this.form = { ...row }
        },
        // res 是上传成功后 服务器返回给前端的数据
        // file 相同
        handleAvatarSuccess(res, file) {
            this.form.logoUrl = res.data
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
        },
        clearformdata() {
            this.form = {
                tmName: '',
                logoUrl: ''
            }
        },
        addOrUpdateTradeMark() {

            this.$refs.ruleFrom.validate(async (success) => {
                if (success) {
                    this.dialogFormVisible = false
                    await this.$API.tradeMark.reqAddOrUpdateTradeMark(this.form)
                    // 拦截器已经处理过了 成功后再次获取列表
                    this.$message({
                        showClose: true,
                        message: this.form.id ? '修改品牌成功' : '添加品牌成功',
                        type: 'success'
                    });
                    this.getPageList(this.form.id ? this.page : 1)
                } else {
                    return false
                }

            })

        },
        deletetradeMark(row) {
            this.$confirm(`此操作将会永久删除${row.tmName}, 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                await this.$API.tradeMark.reqDeleteTradeMark(row.id)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                // 有数据就保留原页面，没有数据就去上一页
                this.getPageList(this.list.length > 1 ? this.page : this.page - 1)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

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