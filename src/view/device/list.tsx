import { DialogHelper } from "@/airpower/helper/DialogHelper"
import { APanel } from "@/airpower/component"
import Detail from "./detail"
import { Button } from "antd"

const List = () => {
    function onDetail() {
        DialogHelper.show(Detail, {
            id: 123,
            name: '制冷设备'
        })
    }

    return (
        <APanel title="设备列表">
            <Button type="primary" onClick={onDetail}>详情</Button>
        </APanel>
    )
}

export default List