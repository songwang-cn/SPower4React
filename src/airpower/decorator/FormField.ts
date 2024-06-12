import { AirFormFieldConfig } from "../config/AirFormFieldConfig";
import { IFormFieldConfig } from "../interface/IFormFieldConfig";
import { AirModel } from "../model/AirModel";

const FormFieldKey = Symbol('FormFieldKey')

const FormFieldConfigKey = Symbol('FormFieldConfigKey')

export const FormField = <E extends AirModel>(formFieldConfig?: IFormFieldConfig) => (target: E, key: string) => {
    const list = Reflect.getMetadata(FormFieldKey, target) || []

    list.push(key)

    Reflect.defineMetadata(FormFieldKey, list, target)

    Reflect.defineMetadata(FormFieldConfigKey, formFieldConfig, target, key)
}


export function getFormFieldList<E extends AirModel>(target: E) {
    let list = Reflect.getOwnMetadata(FormFieldKey, target) || []
    const superClass = Object.getPrototypeOf(target)
    if (superClass.constructor.name !== AirModel.name) {
        list = list.concat(getFormFieldList(superClass))
    }
    return list
}

export function getFormFieldConfig<E extends AirModel>(target: E, fieldKey: string) {
    let config = Reflect.getMetadata(FormFieldConfigKey, target, fieldKey)

    const superClass = Object.getPrototypeOf(target)

    if (superClass.constructor.name !== AirModel.name) {
        config = Object.assign(getFormFieldConfig(superClass, fieldKey), config)
    }

    return Object.assign(new AirFormFieldConfig(), config)
}
