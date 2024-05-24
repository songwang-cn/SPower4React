import './index.scss'
import * as ANTD from 'antd'
import { AButton } from '@/airpower/component'
import { ReactNode } from 'react'
import { ITableCustomRenderProps } from '@/interface/ITableCustomRenderProps'

interface TablePropTypes extends ITableCustomRenderProps<(_: unknown) => JSX.Element | unknown> {
    dataList: any[]
    entity?: any,
    ctrlWidth?: number,
    customCtrl?: ReactNode
    beforeCtrl?: ReactNode
    endCtrl?: ReactNode
    align?: string
    onDetail?: (row: any) => void
    onEdit?: (row: any) => void
    onDelete?: (row: any) => void
}

/**
 * 
 * @param dataList  列表数据
 * @param entity  列表实体类
 * @param hideFull-是否隐藏全屏按钮
 * @param __slotByColumnKey 👇👇👇👇👇👇列名作为插槽使用，看下方描述 👇👇👇👇👇👇
 * @description 每一列的 key 值可作为 插槽名 传入，返回一个参数为该列数据的方法，此时ts校验props类型会报错，去 ITableCustomRenderProps 添加上相应字段即可
 */

const Table: React.FC<TablePropTypes> = ({ dataList = [], ctrlWidth = 200, ...props }) => {

    const columns = [
        {
            title: '姓名',
            key: 'name',
        },
        {
            title: '年龄',
            key: 'age',
        },
        {
            title: '家庭地址',
            key: 'address',
        },
        {
            title: '标签',
            key: 'tags',
        }
    ]

    return (
        <ANTD.Table dataSource={dataList}>
            <ANTD.Table.Column align='center' title='序号' render={(_, __, index) => <>{index + 1}</>} />
            {
                columns.map(item =>
                    <ANTD.Table.Column
                        title={item.title}
                        dataIndex={item.key}
                        key={item.key}
                        render={(props as any)[`${item.key}`] && (props as any)[`${item.key}`]} //模拟作用域插槽，dataIndex 为插槽名
                    />
                )
            }
            <ANTD.Table.Column
                width={ctrlWidth}
                title="操作"
                key="action"
                render={(_, record, __) =>
                    <>
                        {
                            props.customCtrl ? props.customCtrl :
                                <>
                                    {props.beforeCtrl}
                                    <AButton iconType='DETAIL' iconButton tooltip='详情' onClick={() => props.onDetail && props.onDetail(record)}>详情</AButton>
                                    <AButton iconType='EDIT' iconButton tooltip='编辑' onClick={() => props.onEdit && props.onEdit(record)}>编辑</AButton>
                                    <AButton iconType='DELETE' iconButton tooltip='删除' danger onClick={() => props.onDelete && props.onDelete(record)}>删除</AButton>
                                    {props.endCtrl}
                                </>
                        }

                    </>
                } />
        </ANTD.Table>
    )
}

export default Table