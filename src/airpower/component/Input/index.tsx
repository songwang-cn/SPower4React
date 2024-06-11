import './index.scss'
import React from 'react'
import { ClassConstructor } from 'class-transformer';
import { AirEntity } from '@/airpower/dto/AirEntity';
import * as ANTD from 'antd'

interface InputPropsType {
    entity: ClassConstructor<AirEntity>
    fieldKey: string  // 字段名
    value?: string;
}

const Input: React.FC<InputPropsType> = ({ ...props }) => {

    const entityClass = props.entity.prototype

    const formFieldConfig = entityClass.getFormFieldConfig(props.fieldKey)

    const fieldName = entityClass.getFieldName(props.fieldKey)

    const placeholder = formFieldConfig.placeholder || `请输入${entityClass.getFieldName(props.fieldKey)}`

    return (
        <ANTD.Form.Item
            label={fieldName}
            name={props.fieldKey}
            rules={[
                { required: true, message: placeholder },
            ]}
        >
            <ANTD.Input onChange={() => { }} placeholder={placeholder} />
        </ANTD.Form.Item>
    )

}

export default Input