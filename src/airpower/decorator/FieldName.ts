import { AirModel } from "../model/AirModel";

const FieldNameKey = Symbol('FieldNameKey');

export const FieldName = <E extends AirModel>(fieldName: string) => (target: E, key: string) => {
    Reflect.defineMetadata(FieldNameKey, fieldName, target, key)
}

export function getFieldName<E extends AirModel>(target: E, key: string) {
    let fieldName = Reflect.getOwnMetadata(FieldNameKey, target, key)
    if (fieldName) {
        return fieldName
    }
    const superClass = Object.getPrototypeOf(target)
    if (superClass.constructor.name === AirModel.name) {
        return key
    }
    fieldName = getFieldName(superClass, key)
    return fieldName

}