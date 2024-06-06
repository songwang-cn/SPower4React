import { APanel, ATable, APage, AToolBar } from "@/airpower/component"
import { DeviceEntity } from "@/entity/DeviceEntity"
import { DeviceService } from "@/service/DeviceService"
import { useTableHook } from "@/airpower/hook/useTableHook"
import Detail from "./detail"
import Edit from "./edit"
import { AirEntity } from "@/airpower/dto/AirEntity"
import React, { useState } from "react"


const List = () => {

    const {
        request,
        response,
        isLoading,
        setRequest,
        onPageChange,
        onAdd,
        onEdit,
        onDelete,
        onDetail
    } = useTableHook(DeviceEntity, DeviceService, {
        editView: Edit,
        detailView: Detail
    })

    function onSearch(param: AirEntity) {
        console.log(param)
        setRequest(request.setQueryParams(param))
    }

    const [selectedRows, setSelectedRows] = useState<DeviceEntity[]>([])

    function onSelectChange(selectedRowKeys: React.Key[], selectedRows: DeviceEntity[]) {
        setSelectedRows(selectedRows)
    }

    return (

        <APanel
            title="设备列表"
            footerRight={
                <APage
                    pageData={response}
                    onChange={onPageChange}
                />
            }
        >
            {JSON.stringify(request.queryParams)}
            {JSON.stringify(selectedRows)}
            <AToolBar entity={DeviceEntity} onSearch={onSearch} onAdd={onAdd} />
            <ATable
                loading={isLoading}
                entity={DeviceEntity}
                dataList={response.items}
                childrenColumnName="sons"
                beforeCtrl={(record, index) => <>前插槽</>}
                endCtrl={(record, index) => <>后插槽</>}
                onDetail={onDetail}
                onEdit={onEdit}
                onDelete={onDelete}
                onSelectChange={onSelectChange}
                initSelectRowKeys={[
                    4134033632078336,
                    4133346081102336
                ]}
            />
        </APanel>
    )
}

export default List