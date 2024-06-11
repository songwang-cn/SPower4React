import Dialog from "@/airpower/component/Dialog"
import { AInput } from "@/airpower/component"
import { DeviceEntity } from "@/entity/DeviceEntity"
import { Form, FormInstance } from "antd"
import { useRef } from "react"

const Edit = (props: any) => {

    const formRef = useRef<FormInstance>(null)

    return (
        <Dialog
            title={"编辑"}
            onCancel={props.onCancel}
            onConfirm={props.onConfirm}
        >
            <Form ref={formRef}>
                <AInput entity={DeviceEntity} fieldKey={"name"} />
            </Form>
        </Dialog>
    )
}

export default Edit
