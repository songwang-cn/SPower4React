import { AirTableFieldConfig } from "../config/AirTableFieldConfig";
import { getTableFieldList, getTableFieldConfig } from "../decorator/TableField";
import { getFieldName } from "../decorator/FieldName";

/**
 * 模型基类 AModel 基类
 * author: songwang
 */
export class AModel {
    static getTableFieldList(): string[] {
        return new this().getTableFieldList()
    }

    static getTableFieldConfig(key: string): AirTableFieldConfig {
        return new this().getTableFieldConfig(key)
    }

    static getTableFieldName(fieldKey: string) {
        return new this().getTableFieldName(fieldKey)
    }

    /**
     * 获取表格字段列表。
     * @returns {string[]} 返回一个字符串数组，包含表格的字段列表。
     */
    getTableFieldList = (): string[] => getTableFieldList(this)

    /**
     * 获取指定字段键的表字段配置。
     * @param fieldKey 字段的键，用于从表字段配置中检索特定的字段配置。
     * @returns 返回一个符合 AirTableFieldConfig 接口的字段配置对象。
     */
    getTableFieldConfig = (fieldKey: string): AirTableFieldConfig => getTableFieldConfig(this, fieldKey)


    /**
     * 获取表字段的名称。
     * @param fieldKey 字段键，用于标识特定的表字段。
     * @returns 返回字段的标签名称。如果在表字段配置中找到，则返回配置中的标签名称；如果未找到，则返回通用的字段名称。
     */
    getTableFieldName = (fieldKey: string): string => getTableFieldConfig(this, fieldKey)?.label || getFieldName(this, fieldKey)

    /**
     * # 将当前实例复制到一个新实例上
     */
    copy(): this {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this
    }

} 