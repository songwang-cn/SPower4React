import { AModel } from "../model/AModel";

const FieldNameKey = Symbol('FieldNameKey');

export const FieldName = <E extends AModel>(fieldName: string) => (target: E, key: string) => {
    Reflect.defineMetadata(FieldNameKey, fieldName, target, key)
}

export function getFieldName<E extends AModel>(target: E, key: string) {
    let fieldName = Reflect.getOwnMetadata(FieldNameKey, target, key)
    if (fieldName) {
        return fieldName
    }
    const superClass = Object.getPrototypeOf(target)
    if (superClass.constructor.name === AModel.name) {
        return key
    }
    fieldName = getFieldName(superClass, key)
    return fieldName

}