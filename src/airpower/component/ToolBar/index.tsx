import './index.scss'
import { AirEntity } from "@/airpower/dto/AirEntity"
import { ClassConstructor } from "class-transformer"
import { AButton } from '../index'
import { Input, Select } from 'antd'
import { useEffect, useState, useRef } from 'react'
import { IRecord } from '@/airpower/interface/IRecord'
import { AirClassTransformerHelper } from '@/airpower/helper/AirClassTransformerHelper'
import { AirModel } from '@/airpower/model/AirModel'
import { IToolbarCustomSlots } from '@/interface/IToolbarCustomSlots'


interface ToolBarPropsType extends IToolbarCustomSlots {
    entity: ClassConstructor<AirEntity>
    showImport?: boolean
    showExport?: boolean
    onAdd?: () => void
    onImport?: () => void
    onExport?: () => void
    onSearch: (formData: AirEntity) => void
}

const ToolBar: React.FC<ToolBarPropsType> = ({ showImport = false, showExport = false, ...props }) => {

    const entityClass = props.entity.prototype

    const searchFieldList = entityClass.getSearchFieldList()

    const [formData, setFormData] = useState(AirClassTransformerHelper.newInstance(props.entity))

    const isInitialRender = useRef(true); // 用于标记是否是首次渲染

    function changeFormData(fieldKey: string, value: any) {
        setFormData({
            ...formData,
            [fieldKey]: value
        } as AirEntity)
    }

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false
            return
        }
        props.onSearch(formData)
    }, [formData])

    function onReset() {
        setFormData(new props.entity!())
    }

    return (
        <div className="air-toolbar">
            <div className="bar-left">
                <AButton type='primary' iconType='ADD' onClick={() => props.onAdd!()}>
                    新增{entityClass.getClassName()}
                </AButton>
                {
                    showImport ? <AButton onClick={props.onImport}>导入</AButton> : ''
                }
            </div>
            <div className="bar-center">
                {
                    searchFieldList.map((fieldKey: string) => {
                        const fieldSearchConfig = entityClass.getSearchFieldConfig(fieldKey)
                        const placeholder = `请选择${entityClass.getFieldName(fieldKey)}`
                        if ((props as any)[fieldKey]) {
                            return (
                                <div className="search-item">
                                    {(props as any)[fieldKey]}
                                </div>
                            )
                        } else {
                            if (fieldSearchConfig.enumRecord?.length) {
                                return (
                                    <div className="search-item">
                                        <Select
                                            mode={fieldSearchConfig.multiple ? 'multiple' : undefined}
                                            maxTagCount='responsive'
                                            allowClear
                                            placeholder={placeholder}
                                            value={(formData as any)[fieldKey]}
                                            onChange={value => changeFormData(fieldKey, value)}
                                        >
                                            {
                                                fieldSearchConfig.enumRecord?.map((item: IRecord) => (
                                                    <Select.Option key={item.key as number} value={item.key}>{item.label}</Select.Option>
                                                ))
                                            }
                                        </Select>
                                    </div>
                                )
                            }
                            let inputValue = (formData as any)[fieldKey]
                            return (
                                <div className="search-item">
                                    <Input
                                        allowClear
                                        placeholder={placeholder}
                                        onChange={e => {
                                            inputValue = e.target.value
                                            if (inputValue === '') {
                                                changeFormData(fieldKey, '')
                                            }
                                        }}
                                        onPressEnter={() => changeFormData(fieldKey, inputValue)}
                                    />
                                </div>
                            )

                        }
                    })
                }

                <AButton type='primary' onClick={() => props.onSearch(formData)}>搜索</AButton>
                <AButton onClick={onReset}>重置</AButton>
                {
                    showExport ? <AButton onClick={props.onExport}>导出</AButton> : ''
                }
            </div>
        </div>
    )
}

export default ToolBar
