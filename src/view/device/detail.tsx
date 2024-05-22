import Dialog from "@/airpower/component/Dialog"

const Info = (props: any) => {
    return (
        <Dialog
            title="详情"
            onCancel={props.onCancel}
            onConfirm={props.onConfirm}
            width={500}
            height={200}
        >

            {JSON.stringify(props.param)}
        </Dialog>
    )
}

export default Info