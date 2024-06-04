import { DeviceEntity } from "@/entity/DeviceEntity"
import { useState, useRef, useEffect } from "react"
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
    detailView?: React.FC,
    editView?: React.FC,
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
        DialogHelper.show(option?.detailView, row.copy())
    }

    function onEdit(row: DeviceEntity) {
        DialogHelper.show(option?.editView, row)
    }

    function onDelete(row: DeviceEntity) {
        console.log('删除')
        AirNotification.warning('深处')
    }

    function onPageChange(page: AirPage) {
        setRequest(request.setPage(page))
    }

    const [request, setRequest] = useState(new AirRequest<E>(entityClass))

    const [response, setResponse] = useState(new AirResponse<E>())

    const [isLoading, setLoading] = useState(false)

    async function getPage() {
        setLoading(true)
        const res = await service.getPage(request)
        res.items.map(v => v.type = [1, 2, 3][Math.ceil(Math.random() * 2)])
        setResponse(res)
        setLoading(false)
    }

    useEffect(() => {
        getPage()
    }, [request])

    return {
        isLoading,
        request,
        response,
        setRequest,
        onPageChange,
        onDetail,
        onEdit,
        onDelete,
        getPage
    }
}