import { APanel, ATable, APage } from "@/airpower/component"
import { DeviceEntity } from "@/entity/DeviceEntity"
import { DeviceService } from "@/service/DeviceService"
import { useTableHook } from "@/airpower/hook/useTableHook"
import Detail from "./detail"
import Edit from "./edit"


const List = () => {

    const {
        response,
        isLoading,
        onPageChange,
        onDetail,
        onEdit,
        onDelete
    } = useTableHook(DeviceEntity, DeviceService, {
        editView: Edit,
        detailView: Detail
    })

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
            />
        </APanel>
    )
}

export default List