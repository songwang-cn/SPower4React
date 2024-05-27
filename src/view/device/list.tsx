import { DialogHelper } from "@/airpower/helper/DialogHelper"
import { APanel, ATable, AButton } from "@/airpower/component"
import Detail from "./detail"
import { Tag } from "antd"
import { DeviceEntity } from "@/entity/DeviceEntity"


const List = () => {
    function onDetail(row: DeviceEntity) {
        DialogHelper.show(Detail, row.copy())
    }

    function onEdit(row: DeviceEntity) {
        DialogHelper.show(Detail, row)
    }

    function onDelete(row: DeviceEntity) {
        console.log('删除')
    }

    const dataList = [
        new DeviceEntity({
            id: 1,
            name: '设备1',
            code: 'code1338',
            type: '生产设备',
            status: ['nice', 'developer'],
        })
    ]

    return (
        <APanel title="设备列表">
            <ATable
                entity={DeviceEntity}
                dataList={dataList}
                ctrlWidth={400}
                beforeCtrl={<>前自定义内容</>}
                endCtrl={<AButton>后自定义内容</AButton>}
                onDetail={onDetail}
                onEdit={onEdit}
                onDelete={onDelete}
                status={(text: string) => <Tag>{text}</Tag>}
            />
        </APanel>
    )
}

export default List