import { DialogHelper } from "@/airpower/helper/DialogHelper"
import { APanel, ATable, AButton, APage } from "@/airpower/component"
import { DeviceEntity } from "@/entity/DeviceEntity"
import { AirNotification } from "@/airpower/feedback/AirNotification"
import { AirRequest } from "@/airpower/dto/AirRequest"
import { useState, useRef, useEffect, useCallback } from "react"
import { AirResponse } from "@/airpower/dto/AirResponse"
import { AirPage } from "@/airpower/dto/AirPage"
import { DeviceService } from "@/service/DeviceService"
import Detail from "./detail"


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

    const [request, setRequest] = useState(new AirRequest<DeviceEntity>())

    const [response, setResponse] = useState(new AirResponse())

    const loading = useRef(false)

    async function getPage() {
        const res = await new DeviceService(loading).getPage(request)
        setResponse(res)
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