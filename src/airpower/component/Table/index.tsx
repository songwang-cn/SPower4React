import './index.scss'
import * as ANTD from 'antd'
import { AButton } from '@/airpower/component'
import { ReactNode } from 'react'
import { ITableCustomRenderProps } from '@/interface/ITableCustomRenderProps'
import { BaseEntity } from '@/airpower/base/BaseEntity'
import { SettingOutlined } from '@ant-design/icons'
import { AppConfig } from '@/airpower/config/AppConfig'
import { useState } from 'react'

interface TablePropTypes extends ITableCustomRenderProps<(text: any, record: Record<string, any>, index: number) => JSX.Element | any> {
    dataList: any[]
    entity: any,
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
 * @not-param __slotByColumnKey 👇👇👇👇👇👇列名作为插槽使用，看下方描述 👇👇👇👇👇👇
 * @description 每一列的 key 值可作为 插槽名 传入，返回一个参数为该列数据的方法，此时ts校验props类型会报错，去 ITableCustomRenderProps 添加上相应字段即可
 */

const Table: React.FC<TablePropTypes> = ({ entity, dataList = [], ctrlWidth = 200, ...props }) => {

    const entitySuper = entity.prototype as BaseEntity

    const allFieldList = entitySuper.getTableFieldList()

    const [selectedFieldList, setSelectedFieldList] =
        useState(JSON.parse(localStorage.getItem(`select_fields_of_${AppConfig.appId}_${entity.name}`) || JSON.stringify(allFieldList.filter(v => !entitySuper.getTableFieldConfig(v)?.hide))))


    function onCopyField(fieldValue: string) {
        navigator.clipboard.writeText(fieldValue)
    }

    return (
        <ANTD.Table dataSource={dataList} size='small'>
            <ANTD.Table.Column align='center' title='序号' render={(_, __, index) => <>{index + 1}</>} />
            {
                allFieldList.filter(key => selectedFieldList.includes(key)).map(fieldKey =>
                    <ANTD.Table.Column
                        title={entitySuper.getTableFieldName(fieldKey)}
                        dataIndex={fieldKey}
                        key={fieldKey}
                        render={(text, record, index) => {
                            if ((props as any)[`${fieldKey}`]) {
                                // 表格作用域插槽，抛出 text，record，index
                                return (props as any)[`${fieldKey}`](text, record, index)
                            } else if (entitySuper.getTableFieldConfig(fieldKey)?.isCopyField) {
                                return (
                                    <ANTD.Tooltip title='点击复制'>
                                        <span className='copyField' onClick={() => onCopyField(text)}>{text}</span>
                                    </ANTD.Tooltip>
                                )
                            } else {
                                return text
                            }
                        }
                        }

                    />
                )
            }
            <ANTD.Table.Column
                width={ctrlWidth}
                title={
                    <div className='actionHeadet'>
                        <span>操作</span>
                        <ANTD.Popover
                            content={
                                <>
                                    {
                                        entitySuper.getTableFieldList().map(fieldKey =>
                                            <ANTD.Tag.CheckableTag
                                                checked={selectedFieldList.includes(fieldKey)}
                                                onChange={(checked: boolean) => {
                                                    const __selectedFieldList = checked ? [...selectedFieldList, fieldKey] : selectedFieldList.filter((key: string) => key !== fieldKey)
                                                    setSelectedFieldList(__selectedFieldList)
                                                    localStorage.setItem(`select_fields_of_${AppConfig.appId}_${entity.name}`, JSON.stringify(__selectedFieldList))
                                                }}
                                            >
                                                {entitySuper.getTableFieldName(fieldKey)}
                                            </ANTD.Tag.CheckableTag>
                                        )
                                    }
                                </>
                            }
                            title="请选择需要显示的字段"
                            trigger="click"
                            placement="bottomRight"
                            arrow={false}
                        >
                            <ANTD.Tooltip title="配置列字段">
                                <SettingOutlined className='hoverIcon' />
                            </ANTD.Tooltip>
                        </ANTD.Popover>
                    </div>
                }
                key="action"
                filtered={true}
                filterIcon={123}
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