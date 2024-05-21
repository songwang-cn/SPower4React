import { DialogHelper } from "@/airpower/helper/DialogHelper"
import Detail from "./detail"
import { Button } from "antd"

const List = () => {
    function onDetail() {
        DialogHelper.show(Detail)
    }

    return (
        <div>
            <Button onClick={onDetail}>详情</Button>
        </div>
    )
}

export default List