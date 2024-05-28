import './index.scss'
import * as ANTD from 'antd'
import { AButton } from '@/airpower/component'
import { ITableCustomRenderProps } from '@/interface/ITableCustomRenderProps'
import { SettingOutlined, CaretRightOutlined } from '@ant-design/icons'
import { AppConfig } from '@/config/AppConfig'
import { useState } from 'react'
import { AirEntity } from '@/airpower/dto/AirEntity'
import { AlignType } from 'rc-table/lib/interface'
import { ClassConstructor } from 'class-transformer'

interface TablePropTypes extends ITableCustomRenderProps<(text: any, record: Record<string, any>, index: number) => JSX.Element | any> {
    dataList: AirEntity[]
    entity: ClassConstructor<AirEntity>
    ctrlWidth?: number
    align?: AlignType
    hideIndex?: boolean
    hideSelect?: boolean
    checkStrictly?: boolean // 当为树形表格时，是否关闭父子联动选择 true时开启联动， false关闭联动
    childrenColumnName?: string // 展示树形数据，默认为 children，可配置
    multiple?: boolean // 是否开启多选
    customCtrl?: (record: AirEntity, index: number) => JSX.Element | any
    beforeCtrl?: (record: AirEntity, index: number) => JSX.Element | any
    endCtrl?: (record: AirEntity, index: number) => JSX.Element | any
    onDetail?: (record: AirEntity, index: number) => JSX.Element | any
    onEdit?: (record: AirEntity, index: number) => JSX.Element | any
    onDelete?: (record: AirEntity, index: number) => JSX.Element | any
}



/**
 * 
 * @param dataList  列表数据
 * @param entity  列表实体类
 * @param hideFull-是否隐藏全屏按钮
 * @not-param __slotByColumnKey 👇👇👇👇👇👇列名作为插槽使用，看下方描述 👇👇👇👇👇👇
 * @description 每一列的 key 值可作为 插槽名 传入，返回一个参数为该列数据的方法，此时ts校验props类型会报错，去 ITableCustomRenderProps 添加上相应字段即可
 */

const Table: React.FC<TablePropTypes> = ({ entity, dataList = [], ctrlWidth = 200, align = 'left', childrenColumnName = 'children', multiple = true, checkStrictly = false, ...props }) => {

    const entityClass = entity as unknown as AirEntity

    const allFieldList = entityClass.getTableFieldList() || []

    const [selectedFieldList, setSelectedFieldList] = useState(JSON.parse(localStorage.getItem(`select_fields_of_${AppConfig.appId}_${entity.name}`) || JSON.stringify(allFieldList.filter((key: string) => !entityClass.getTableFieldConfig(key)?.hide))))

    function onCopyField(fieldValue: string) {
        navigator.clipboard.writeText(fieldValue)
    }

    function createFieldNode(fieldKey: string, text: any) {
        if (!text) {
            return AppConfig.fieldEmptyHolder
        }
        const fieldConfig = entityClass.getTableFieldConfig(fieldKey)
        const isCopyDom = () => fieldConfig?.isCopyField ?
            <ANTD.Tooltip title='点击复制'>
                <span className='copyField' onClick={() => onCopyField(text)}>
                    {text}
                </span>
            </ANTD.Tooltip>
            : text

        return fieldConfig?.isTag ? <ANTD.Tag style={{ margin: '2px' }}>{isCopyDom()}</ANTD.Tag> : isCopyDom()
    }

    const FieldPopoverContent: React.FC = () => {
        return (
            <div className='select_fields_pop'>
                {allFieldList.map((fieldKey: string) =>
                    <ANTD.Tag.CheckableTag
                        checked={selectedFieldList.includes(fieldKey)}
                        onChange={(checked: boolean) => {
                            const __selectedFieldList = checked ? [...selectedFieldList, fieldKey] : selectedFieldList.filter((key: string) => key !== fieldKey)
                            setSelectedFieldList(__selectedFieldList)
                            localStorage.setItem(`select_fields_of_${AppConfig.appId}_${entity.name}`, JSON.stringify(__selectedFieldList))
                        }}
                    >
                        {entityClass.getTableFieldName(fieldKey)}
                    </ANTD.Tag.CheckableTag>
                )}
            </div>

        )
    }

    return (
        <ANTD.Table
            rowKey="id"
            expandable={{
                childrenColumnName: 'sons',
                defaultExpandAllRows: true,
                expandIcon: ({ expanded, onExpand, record }) =>
                    ((record as any)[childrenColumnName]?.length ? <CaretRightOutlined className={`expandIcon ${expanded ? 'expanded' : ''}`} onClick={e => onExpand(record, e)} /> : '')
            }}
            rowSelection={
                props.hideSelect ? undefined : {
                    checkStrictly,
                    type: multiple ? 'checkbox' : 'radio',
                }
            }
            dataSource={dataList}
            size='small'
        >
            {
                !props.hideIndex && <ANTD.Table.Column align={align} title='序号' render={(_, __, index) => <>{index + 1}</>} />
            }
            {
                allFieldList.filter((key: string) => selectedFieldList.includes(key)).map((fieldKey: string) =>
                    <ANTD.Table.Column
                        title={entityClass.getTableFieldName(fieldKey)}
                        dataIndex={fieldKey}
                        key={fieldKey}
                        width={entityClass.getTableFieldConfig(fieldKey)?.width}
                        render={
                            (text, record, index) => {
                                if ((props as any)[`${fieldKey}`]) {
                                    // 表格作用域插槽，抛出 text，record，index
                                    return (props as any)[`${fieldKey}`](text, record, index)
                                } else if (Array.isArray(text) && text.length && entityClass.getTableFieldConfig(fieldKey)?.payloadArray) {
                                    return (
                                        text.map((item: any) => createFieldNode(fieldKey, item[entityClass.getTableFieldConfig(fieldKey)?.payloadArray]))
                                    )
                                } else if (typeof text === 'object' && entityClass.getTableFieldConfig(fieldKey)?.payload) {
                                    return createFieldNode(fieldKey, text[entityClass.getTableFieldConfig(fieldKey)?.payload])
                                } else {
                                    return createFieldNode(fieldKey, text)
                                }
                            }
                        }

                    />
                )
            }
            <ANTD.Table.Column
                fixed={'right'}
                width={ctrlWidth}
                title={
                    <div className='actionHeadet'>
                        <span>操作</span>
                        <ANTD.Popover
                            title="请选择需要显示的字段"
                            trigger="click"
                            placement="bottomRight"
                            arrow={false}
                            content={<FieldPopoverContent />}
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
                render={(_, record: AirEntity, index: number) =>
                    <>
                        {
                            props.customCtrl ? props.customCtrl(record, index) :
                                <>
                                    {props.beforeCtrl && props.beforeCtrl(record, index)}
                                    <AButton iconType='DETAIL' iconButton tooltip='详情' onClick={() => props.onDetail && props.onDetail(record, index)}>详情</AButton>
                                    <AButton iconType='EDIT' iconButton tooltip='编辑' onClick={() => props.onEdit && props.onEdit(record, index)}>编辑</AButton>
                                    <AButton iconType='DELETE' iconButton tooltip='删除' danger onClick={() => props.onDelete && props.onDelete(record, index)}>删除</AButton>
                                    {props.endCtrl && props.endCtrl(record, index)}
                                </>
                        }

                    </>
                } />
        </ANTD.Table >
    )
}

export default Table