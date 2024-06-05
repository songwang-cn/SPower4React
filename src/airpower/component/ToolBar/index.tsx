import './index.scss'
import { AirEntity } from "@/airpower/dto/AirEntity"
import { ClassConstructor } from "class-transformer"
import { AButton } from '../index'
import { Input, Select } from 'antd'
import { useEffect, useState, useRef } from 'react'
import { IRecord } from '@/airpower/interface/IRecord'
import { AirClassTransformerHelper } from '@/airpower/helper/AirClassTransformerHelper'
import { AirModel } from '@/airpower/model/AirModel'


interface ToolBarPropsType {
    entity: ClassConstructor<AirEntity>
    onAdd?: () => void
    onSearch: (formData: AirEntity) => void
}

const ToolBar: React.FC<ToolBarPropsType> = ({ onSearch, ...props }) => {

    const entityClass = props.entity.prototype

    const searchFieldList = entityClass.getSearchFieldList()

    const [formData, setFormData] = useState(AirClassTransformerHelper.newInstance(props.entity))

    function changeFormData(fieldKey: string, value: any) {
        setFormData({
            ...formData,
            [fieldKey]: value
        } as AirEntity)
    }

    useEffect(() => {
        onSearch(formData)
    }, [formData])

    function onReset() {
        setFormData(new props.entity!())
        onSearch(formData)
    }

    return (
        <div className="air-toolbar">
            <div className="bar-left">
                <AButton type='primary' iconType='ADD' onClick={() => props.onAdd!()}>
                    新增{entityClass.getClassName()}
                </AButton>
            </div>
            <div className="bar-center">
                {
                    searchFieldList.map((fieldKey: string) => {
                        const fieldSearchConfig = entityClass.getSearchFieldConfig(fieldKey)
                        const placeholder = `请选择${entityClass.getTableFieldName(fieldKey)}`
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
                    })
                }

                <AButton type='primary' onClick={() => onSearch(formData)}>搜索</AButton>
                <AButton onClick={onReset}>重置</AButton>
            </div>
        </div>
    )
}

export default ToolBar
