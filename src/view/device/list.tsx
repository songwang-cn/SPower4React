import { DialogHelper } from "@/airpower/helper/DialogHelper"
import { APanel, ATable, AButton, APage } from "@/airpower/component"
import Detail from "./detail"
import { DeviceEntity } from "@/entity/DeviceEntity"
import { UserEntity } from "@/entity/UserEntity"
import { RoleEntity } from "@/entity/RoleEntity"
import { AirNotification } from "@/airpower/feedback/AirNotification"
import { AirHttp } from "@/airpower/model/AirHttp"
import { AirRequest } from "@/airpower/dto/AirRequest"
import { useState, useRef, useEffect } from "react"
import { AirResponse } from "@/airpower/dto/AirResponse"
import { AirPage } from "@/airpower/dto/AirPage"


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

    const [request, setRequest] = useState(new AirRequest<DeviceEntity>())

    const [response, setResponse] = useState(new AirResponse())

    const [loading, setLoading] = useState(false)

    async function getPage() {
        setLoading(true)
        setResponse(await new AirHttp('baDevice/page').post(request))
        setLoading(false)
    }

    useEffect(() => {
        getPage()
    }, [request])

    function onPageDataChange(page: AirPage) {
        setRequest(request.setPage(page))
        getPage()
    }

    return (
        <APanel
            title="设备列表"
            footerRight={<APage pageData={response} onChange={onPageDataChange} />}
        >
            <ATable
                loading={loading}
                hideSelect
                entity={DeviceEntity}
                dataList={response.items}
                ctrlWidth={400}
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