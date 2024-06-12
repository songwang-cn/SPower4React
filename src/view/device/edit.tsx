import { ADialog, AInput, AGroup } from "@/airpower/component"
import { DeviceEntity } from "@/entity/DeviceEntity"
import { Form } from "antd"
import { useFormHook } from "@/airpower/hook/useFormHook"
import { DeviceService } from "@/service/DeviceService"
import { useState } from 'react'

const Edit = ({ param = new DeviceEntity(), ...props }) => {

    const { formRef, formData, onValuesChange } = useFormHook(DeviceEntity, param)

    const [isLoading, setLoading] = useState(false)

    async function onSubmit() {
        setLoading(true)
        await new DeviceService().saveOrUpdate(formData, `${formData.id ? '更新' : '新增'}成功`)
        setLoading(false)
        props.onConfirm()
    }

    return (
        <ADialog
            loading={isLoading}
            title={`${param.id ? '编辑' : '新增'}`}
            onCancel={props.onCancel}
            onConfirm={onSubmit}
            formRef={formRef}
        >
            {/*  {JSON.stringify(formData)} */}
            <Form
                form={formRef}
                onValuesChange={onValuesChange}
                initialValues={formData}
                labelCol={{ span: 8 }}
            >
                <AGroup title="基本信息" columns={3}>
                    <AInput entity={DeviceEntity} fieldKey={"name"} required />
                    <AInput entity={DeviceEntity} fieldKey={"code"} />
                    <AInput entity={DeviceEntity} fieldKey={"type"} />
                    <AInput entity={DeviceEntity} fieldKey={"isProduceDevice"} />
                    <AInput entity={DeviceEntity} fieldKey={"isMaintenanceDevice"} />
                    <AInput entity={DeviceEntity} fieldKey={"createdTime"} />
                </AGroup>
            </Form>
        </ADialog>
    )
}

export default Edit
