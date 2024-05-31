import { AirTableFieldConfig } from "../config/AirTableFieldConfig"
import { ITableFieldConfig } from "../interface/ITableFieldConfig"
import { AirModel } from "../model/AirModel"


const TableFieldListKey = Symbol('TableFieldListKey')

const TableFieldConfigKey = Symbol('TableFieldConfigKey')

export const TableField = <E extends AirModel>(tableFieldConfig?: ITableFieldConfig) => (target: E, key: string) => {

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
export function getTableFieldList<E extends AirModel>(target: E): string[] {
    let list = Reflect.getOwnMetadata(TableFieldListKey, target) || []
    const superClass = Object.getPrototypeOf(target)
    if (superClass.constructor.name !== AirModel.name) {
        list = list.concat(getTableFieldList(superClass))
    }
    return list
}

/**
 * 
 * @param target 目标对象
 * @param key 目标字段
 * @returns AirTableConfig
 */
export function getTableFieldConfig<E extends AirModel>(target: E, fieldKey: string): AirTableFieldConfig {
    let config = Reflect.getOwnMetadata(TableFieldConfigKey, target, fieldKey) || {}
    const superClass = Object.getPrototypeOf(target)
    if (superClass.constructor.name !== AirModel.name) {
        config = Object.assign(getTableFieldConfig(superClass, fieldKey), config)
    }

    return config
}