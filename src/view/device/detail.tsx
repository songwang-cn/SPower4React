import { ADialog, AGroup } from "@/airpower/component"
import { DeviceEntity } from "@/entity/DeviceEntity"
import { DeviceService } from "@/service/DeviceService"
import { Form } from "antd"
import { useEffect, useState } from 'react'

const Info = (props: any) => {

    const [detail, setDetail] = useState(new DeviceEntity())

    const [isLoading, setLoading] = useState(false)

    async function getDetail() {
        setLoading(true)
        setDetail(await new DeviceService().getDetail(props.param.id))
        setLoading(false)
    }

    useEffect(() => {
        getDetail()
    }, [])

    return (
        <ADialog
            loading={isLoading}
            title="详情"
            onCancel={props.onCancel}
            onConfirm={props.onConfirm}
            hideFooter
        >
            <Form colon labelCol={{ span: 6 }}>
                <AGroup columns={3} title="基础信息">
                    <Form.Item label="设备名称">
                        {detail.name}
                    </Form.Item>
                    <Form.Item label="设备编码">
                        {detail.code}
                    </Form.Item>
                    <Form.Item label="设备位置">
                        {detail.factoryModelInfo?.name}
                    </Form.Item>
                    <Form.Item label="设备位置">
                        {detail.factoryModelInfo?.name}
                    </Form.Item>
                </AGroup>
                <AGroup columns={3} title="设备信息">
                    <Form.Item label="设备名称">
                        {detail.name}
                    </Form.Item>
                    <Form.Item label="设备编码">
                        {detail.code}
                    </Form.Item>
                    <Form.Item label="设备位置">
                        {detail.factoryModelInfo?.name}
                    </Form.Item>
                    <Form.Item label="设备位置">
                        {detail.factoryModelInfo?.name}
                    </Form.Item>
                </AGroup>
            </Form>
        </ADialog >
    )
}

export default Info