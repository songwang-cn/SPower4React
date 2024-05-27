import { AModel } from "../model/AModel";

const FieldNameKey = Symbol('FieldNameKey');

export const FieldName = <E extends AModel>(fieldName: string) => (target: E, key: string) => {
    Reflect.defineMetadata(FieldNameKey, fieldName, target, key)
}

export function getFieldName<E extends AModel>(target: E, key: string) {
    return Reflect.getOwnMetadata(FieldNameKey, target, key)
}