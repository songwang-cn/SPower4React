import Dialog from "@/airpower/component/Dialog"

const Info = (props: any) => {
    return (
        <Dialog
            title="编辑"
            onCancel={props.onCancel}
            onConfirm={props.onConfirm}
        >

            编辑
        </Dialog>
    )
}

export default Info