import { DialogHelper } from "@/airpower/helper/DialogHelper"
import { APanel, ATable, AButton } from "@/airpower/component"
import Detail from "./detail"
import { DeviceEntity } from "@/entity/DeviceEntity"
import { UserEntity } from "@/entity/UserEntity"
import { RoleEntity } from "@/entity/RoleEntity"
import { AirNotification } from "@/airpower/feedback/AirNotification"


const List = () => {
    function onDetail(row: DeviceEntity) {
        DialogHelper.show(Detail, row.copy())
    }

    function onEdit(row: DeviceEntity) {
        DialogHelper.show(Detail, row)
    }

    function onDelete(row: DeviceEntity) {
        console.log('删除')
        AirNotification.warning('深处')
    }

    const dataList = [
        new DeviceEntity({
            id: 1,
            name: '设备',
            code: 'code1338',
            type: '生产设备',
            status: ['nice', 'developer'],
            responseUser: [
                new UserEntity({
                    id: 1,
                    userName: '张三',
                    phoneNumber: '13333333333',
                    roleInfo: new RoleEntity({
                        id: 1,
                        roleName: '管理员',
                        roleCode: 'admin'
                    })
                })
            ],
        })
    ]



    return (
        <APanel title="设备列表">
            <ATable
                hideIndex
                hideSelect
                entity={DeviceEntity}
                dataList={dataList}
                ctrlWidth={400}
                childrenColumnName="sons"
                beforeCtrl={(record, index) => <>前插槽</>}
                endCtrl={(record, index) => <>后插槽</>}
                // customCtrl={(record, index) => <>自定义操作列</>}
                onDetail={onDetail}
                onEdit={onEdit}
                onDelete={onDelete}
            />
        </APanel>
    )
}

export default List