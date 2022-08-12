import request from '@/utils/request'
// 获取列表数据接口
export function reqSpuList(page, limit, category3Id) {
    return request({
        url: `/admin/product/${page}/${limit}`,
        method: "get",
        params: { category3Id }
    })
}
// 获取SPU 信息
export function reqSpu(spuId) {
    return request({
        url: `/admin/product/getSpuById/${spuId}`,
        method: "get",
    })
}
 // 获取品牌信息
export function reqTradeMarkList() {
    return request({
        url: `/admin/product/baseTrademark/getTrademarkList`,
        method: "get",
    })
}
// 获取spu图片的数据
export function reqSpuImageList(spuId) {
    return request({
        url: `/admin/product/spuImageList/${spuId}`,
        method: "get",
    })
}
// 获取销售属性列表
export function reqBaseSaleAttrList() {
    return request({
        url: `/admin/product/baseSaleAttrList`,
        method: "get",
    })
}