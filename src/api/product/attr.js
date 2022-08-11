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

//   /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}

// 获取平台属性的接口
export function reqAttrList(category1Id,category2Id,category3Id) {
    return request({
        url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
        method: "get",
    })
}

// 添加属性和属性值的接口
export function reqAddOrUpdateAttr(data) {
    return request({
        url: `/admin/product/saveAttrInfo`,
        method: "post",
        data
    })
}

// 删除属性接口
export function reqdeleteAttr(attrId) {
    return request({
        url: `/admin/product/deleteAttr/${attrId}`,
        method: "delete",
    })
}