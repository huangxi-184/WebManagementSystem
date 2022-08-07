import request from '@/utils/request'
// 平台属性管理模块请求文件
//获取一级分类数据接口 /admin/product/getCategory1
export function reqCategory1List() {
    return request({
        url: `/admin/product/getCategory1`,
        method: "get",
    })
}

// 二级分类接口
export function reqCategory2List(category1Id) {
    return request({
        url: `/admin/product/getCategory2/${category1Id}`,
        method: "get",
    })
}
// 三级分类接口
export function reqCategory3List(category2Id) {
    return request({
        url: `/admin/product/getCategory3/${category2Id}`,
        method: "get",
    })
}
