import { useState, useEffect } from "react"
import { AirEntity } from "../dto/AirEntity"
import { DialogHelper } from "../helper/DialogHelper"
import { ClassConstructor } from "class-transformer"
import { AirNotification } from "../feedback/AirNotification"
import { AirRequest } from "../dto/AirRequest"
import { AirResponse } from "../dto/AirResponse"
import { AirClassTransformerHelper } from "../helper/AirClassTransformerHelper"
import { AirPage } from "../dto/AirPage"
import { AirAbstractService } from "../service/AirAbstractService"

interface IUseTableOption<E extends AirEntity> {
    detailView?: JSX.Element
    editView?: JSX.Element
    addView?: JSX.Element
    afterGetPage?: (response: AirResponse<E>) => void
}

/**
 * UseTable 😄 表格自定义Hook 
 * @param entityClass 实体类
 * @param serviceClass 请求类
 * @param option 其他选项 IUseTableOption
 * @returns isLoading:是否正在加载，
 * @returns response:请求返回
 * @returns onPageChange:分页变化
 * @returns onDelete:删除
 * @returns onEdit:编辑
 * @returns onDetail:详情
 */

export const useTableHook = <E extends AirEntity, S extends AirAbstractService<E>>(entityClass: ClassConstructor<E>, serviceClass: ClassConstructor<S>, option?: IUseTableOption<E>) => {

    const service = AirClassTransformerHelper.newInstance(serviceClass)


    function onDetail(row: E) {
        DialogHelper.show(option?.detailView!, row.copy())
    }

    async function onEdit(row: E) {
        await DialogHelper.show(option?.editView!, row)
        getPage()
    }

    async function onAdd() {
        await DialogHelper.show(option?.addView! || option?.editView!)
        getPage()
    }

    async function onDelete(row: E) {
        await service.deleteById(row.id!, '删除成功')
        getPage()
    }

    function onPageChange(page: AirPage) {
        setRequest(request.setPage(page))
    }

    function onSearch(param: E) {
        console.log('onSearch', param)
        setRequest(request.setQueryParams(param))
    }

    const [request, setRequest] = useState(new AirRequest<E>())

    const [response, setResponse] = useState(new AirResponse<E>())

    const [isLoading, setLoading] = useState(false)

    async function getPage() {
        setLoading(true)
        setResponse(await service.getPage(request))
        setLoading(false)
    }

    useEffect(() => {
        getPage()
    }, [request])

    return {
        isLoading,
        request,
        response,
        onSearch,
        onPageChange,
        onDetail,
        onAdd,
        onEdit,
        onDelete,
        getPage
    }
}