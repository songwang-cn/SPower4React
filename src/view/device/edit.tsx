import Dialog from "@/airpower/component/Dialog"

export default (props: any) => {
    return (
        <Dialog
            title={"编辑"}
            onCancel={props.onCancel}
            onConfirm={props.onConfirm}
        >

            编辑
        </Dialog>
    )
}
