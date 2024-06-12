import { useState } from 'react'
import { AirEntity } from '../dto/AirEntity'
import { AirClassTransformerHelper } from '../helper/AirClassTransformerHelper'
import { ClassConstructor } from 'class-transformer'
import { Form } from 'antd'

/**
 * 表单钩子 😀
 * @param entity 表单实体类
 * @param initFormData 表单初始数据
 * @returns 
 */

export const useFormHook = <E extends AirEntity>(entity: ClassConstructor<E>, initFormData?: E) => {

    const [formRef] = Form.useForm()

    const [formData, setFormData] = useState(initFormData || AirClassTransformerHelper.newInstance(entity))

    function onValuesChange(_: any, allValues: Record<string, any>) {
        setFormData(AirClassTransformerHelper.parse({ ...formData, ...allValues }, entity))
    }

    return {
        formRef,
        formData,
        onValuesChange
    }
}