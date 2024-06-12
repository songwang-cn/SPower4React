import './index.scss'
import React from 'react'
import { ClassConstructor } from 'class-transformer';
import { AirEntity } from '@/airpower/dto/AirEntity';
import * as ANTD from 'antd'
import { IRecord } from '@/airpower/interface/IRecord';
import dayjs from 'dayjs';

interface InputPropsType {
    entity: ClassConstructor<AirEntity>
    fieldKey: string  // 字段名
    required?: boolean
    value?: string;
}

const Input: React.FC<InputPropsType> = ({ ...props }) => {

    const entityClass = props.entity.prototype

    const formFieldConfig = entityClass.getFormFieldConfig(props.fieldKey)

    const fieldName = entityClass.getFieldName(props.fieldKey)

    const placeholder = formFieldConfig.placeholder || `请${formFieldConfig.enumRecord ? '选择' : '输入'}${entityClass.getFieldName(props.fieldKey)}`

    return (
        <ANTD.Form.Item
            label={fieldName}
            name={props.fieldKey}
            rules={[
                { required: formFieldConfig.isRequired || props.required, message: placeholder },
            ]}
            getValueFromEvent={formFieldConfig.dateType ? (...[, dateString]) => dateString : undefined}
            getValueProps={(value) => ({
                value: formFieldConfig.dateType ? (value ? dayjs(value) : undefined) : value
            })}
        >
            {
                formFieldConfig.enumRecord ? (
                    formFieldConfig.isRadio || formFieldConfig.isRadioButton ?
                        /**
                         * 😀 单选 Radio
                         */
                        <ANTD.Radio.Group
                            optionType={formFieldConfig.isRadioButton ? 'button' : 'default'}
                            buttonStyle="solid"
                        >
                            {
                                formFieldConfig.enumRecord.map((record: IRecord) =>
                                    <ANTD.Radio key={record.key as any} value={record.key}>{record.label}</ANTD.Radio>
                                )
                            }
                        </ANTD.Radio.Group> :
                        /**
                         * 😀 下拉选择器 Select
                         */
                        <ANTD.Select
                            allowClear
                            maxTagCount='responsive'
                            placeholder={placeholder}
                            mode={formFieldConfig.multiple ? 'multiple' : undefined}
                        >
                            {
                                formFieldConfig.enumRecord.map((record: IRecord) =>
                                    <ANTD.Select.Option key={record.key as any} value={record.key}>
                                        {record.label}
                                    </ANTD.Select.Option>)
                            }
                        </ANTD.Select>
                )
                    :
                    formFieldConfig.isSwitch ?
                        /**
                        * 😀 开关 Switch
                        */
                        <ANTD.Switch /> :

                        formFieldConfig.dateType ?

                            /**
                             * 😀 时间选择器 DatePicker
                             */
                            <ANTD.DatePicker
                                style={{ width: '100%' }}
                                picker={formFieldConfig.dateType}
                            /> :

                            /**
                             * 😀 简单输入框 Input
                             */
                            <ANTD.Input placeholder={placeholder} />
            }
        </ANTD.Form.Item>
    )

}

export default Input