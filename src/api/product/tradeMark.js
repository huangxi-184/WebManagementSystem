import request from '@/utils/request'

//获取品牌列表
export function reqTradeMarkList(page, limit) {
    return request({
        url: `/admin/product/baseTrademark/${page}/${limit}`,
        method: "get",

    })
}
// 新增品牌 不需要携带ID
//修改品牌 携带ID 品牌名称 品牌LOGO
export function reqAddOrUpdateTradeMark(tradeMarkList) {
    if (tradeMarkList.id) {
        return request({
            url: `/admin/product/baseTrademark/update`,
            method: "put",
            data: tradeMarkList
        })
    }
    else {
        return request({
            url: `/admin/product/baseTrademark/save`,
            method: "post",
            data: tradeMarkList
        })
    }
}

export function reqDeleteTradeMark(id) {
    return request({
        url: `/admin/product/baseTrademark/remove/${id}`,
        method: "delete",

    })
}

