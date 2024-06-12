import { APanel, ATable, APage, AToolBar } from "@/airpower/component"
import { DeviceEntity } from "@/entity/DeviceEntity"
import { DeviceService } from "@/service/DeviceService"
import { useTableHook } from "@/airpower/hook/useTableHook"
import Detail from "./detail"
import Edit from "./edit"
import React, { useState } from "react"
import { Select } from "antd"
import { AirNotification } from "@/airpower/feedback/AirNotification"


const List = () => {

    const {
        request,
        response,
        isLoading,
        onSearch,
        onPageChange,
        onAdd,
        onEdit,
        onDelete,
        onDetail
    } = useTableHook(DeviceEntity, DeviceService, {
        editView: <Edit />,
        detailView: <Detail />
    })


    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

    function onSelectChange(selectedRowKeys: React.Key[], selectedRows: DeviceEntity[]) {
        setSelectedRowKeys(selectedRowKeys)
    }

    console.log(DeviceEntity.getFormFieldList())

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
            <AToolBar
                entity={DeviceEntity}
                onSearch={onSearch}
                onAdd={onAdd}
                showImport
                showExport
                onImport={() => AirNotification.success('导入导入导入导入导入导入')}
                onExport={() => AirNotification.success('导出导出导出导出导出导出')}
                type={
                    <Select
                        maxTagCount='responsive'
                        placeholder='ToolBar自定义插槽'
                        allowClear
                        value={request.queryParams?.type}
                        onChange={value => onSearch({ ...request.queryParams, type: value } as DeviceEntity)}
                    >
                        {
                            [1, 2, 3, 4, 5].map((item: number) => (
                                <Select.Option key={item} value={item}>选项{item}</Select.Option>
                            ))
                        }
                    </Select>
                }
            />
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
                initSelectRowKeys={selectedRowKeys}
            />
        </APanel>
    )
}

export default List