import { ITableFieldConfig } from "../interface/ITableFieldConfig"
import { AModel } from "../model/AModel"


const TableFieldListKey = Symbol('TableFieldListKey')

const TableFieldConfigKey = Symbol('TableFieldConfigKey')

export const TableField = <E extends AModel>(tableFieldConfig?: ITableFieldConfig) => (target: E, key: string) => {

    const list = Reflect.getOwnMetadata(TableFieldListKey, target) || []

    list.push(key)
    /**
     * 将 字段key 标记为表格字段
     */
    Reflect.defineMetadata(TableFieldListKey, list, target)
    /**
     * 将 该字段的配置 添加到元数据中
     */
    Reflect.defineMetadata(TableFieldConfigKey, tableFieldConfig, target, key)
}

/**
 * 获取类的表格字段列表
 * @param target 目标对象
 * @returns string[]
 */
export function getTableFieldList<E extends AModel>(target: E) {
    return Reflect.getOwnMetadata(TableFieldListKey, target)
}

/**
 * 
 * @param target 目标对象
 * @param key 目标字段
 * @returns AirTableConfig
 */
export function getTableFieldConfig<E extends AModel>(target: E, key: string) {
    return Reflect.getOwnMetadata(TableFieldConfigKey, target, key)
}