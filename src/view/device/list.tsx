import { DialogHelper } from "@/airpower/helper/DialogHelper"
import { APanel, ATable, AButton } from "@/airpower/component"
import Detail from "./detail"
import { Tag } from "antd"


const List = () => {
    function onDetail(row: any) {
        DialogHelper.show(Detail, row)
    }

    function onEdit(row: any) {
        DialogHelper.show(Detail, row)
    }

    function onDelete(row: any) {
        console.log('删除')
    }

    const dataList = [
        {
            id: 1,
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            id: 2,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
    ]

    return (
        <APanel title="设备列表">
            <ATable
                dataList={dataList}
                ctrlWidth={400}
                beforeCtrl={<>前自定义内容</>}
                endCtrl={<AButton>后自定义内容</AButton>}
                onDetail={onDetail}
                onEdit={onEdit}
                onDelete={onDelete}
                tags={(param: any) => <Tag>{param[0]}</Tag>}
                address={(param: any) => <Tag>{param}</Tag>}
            />
        </APanel>
    )
}

export default List