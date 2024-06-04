import './index.scss'
import { AirEntity } from "@/airpower/dto/AirEntity"
import { ClassConstructor } from "class-transformer"
import { AButton } from '../index'
import { Input, Select } from 'antd'
import { useEffect, useState, useRef } from 'react'
import { IRecord } from '@/airpower/interface/IRecord'
import { debounce } from '@/airpower/utils'
import { AirClassTransformerHelper } from '@/airpower/helper/AirClassTransformerHelper'


interface ToolBarPropsType {
    entity: ClassConstructor<AirEntity>
    onSearch: (formData: AirEntity) => void
}

const ToolBar: React.FC<ToolBarPropsType> = ({ onSearch, ...props }) => {


    const searchFieldList = props.entity?.prototype.getSearchFieldList()

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
                <AButton type='primary' iconType='ADD'>
                    新增{JSON.stringify(formData)}
                </AButton>
            </div>
            <div className="bar-center">
                {
                    searchFieldList.map((fieldKey: string) => {
                        const fieldSearchConfig = props.entity?.prototype.getSearchFieldConfig(fieldKey)
                        const placeholder = `请选择${props.entity?.prototype.getTableFieldName(fieldKey)}`
                        if (fieldSearchConfig.enumRecord?.length) {
                            return (
                                <div className="search-item">
                                    <Select
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
                        return (
                            <div className="search-item">
                                <Input
                                    allowClear
                                    placeholder={placeholder}
                                    value={(formData as any)[fieldKey]}
                                    onChange={e => changeFormData(fieldKey, e.target.value)}
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className="bar-right">
                <AButton type='primary' onClick={() => onSearch(formData)}>搜索</AButton>
                <AButton onClick={onReset}>重置</AButton>
            </div>
        </div>
    )
}

export default ToolBar
