import Dialog from "@/airpower/component/Dialog"

const Info = (props: any) => {
    console.log(props)
    return (
        <Dialog
            title="详情"
            onCancel={props.onCancel}
            onConfirm={props.onConfirm}
        />
    )
}

export default Info