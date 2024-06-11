import { AirTableFieldConfig } from "../config/AirTableFieldConfig";
import { getTableFieldList, getTableFieldConfig } from "../decorator/TableField";
import { getFieldName } from "../decorator/FieldName";
import { instanceToPlain } from "class-transformer";
import { getSearchFieldList, getSearchFieldConfig } from "../decorator/SearchField";
import { AirSearchFieldConfig } from "../config/AirSearchFieldConfig";
import { getClassName } from "../decorator/ClassName";
import { getFormFieldConfig, getFormFieldList } from "../decorator/FormField";
import { AirFormFieldConfig } from "../config/AirFormFieldConfig";

/**
 * 模型基类 AirModel 基类
 * author: songwang
 */
export class AirModel {
    static getClassName(): string {
        return new this().getClassName()
    }
    static getTableFieldList(): string[] {
        return new this().getTableFieldList()
    }

    static getTableFieldConfig(fieldKey: string): AirTableFieldConfig {
        return new this().getTableFieldConfig(fieldKey)
    }

    static getFieldName(fieldKey: string) {
        return new this().getFieldName(fieldKey)
    }

    static getSearchFieldList(): string[] {
        return new this().getSearchFieldList()
    }

    static getSearchFieldConfig(fieldKey: string): AirSearchFieldConfig {
        return new this().getSearchFieldConfig(fieldKey)
    }

    static getFormFieldList(): string[] {
        return new this().getFormFieldList()
    }

    static getFormFieldConfig(fieldKey: string): AirFormFieldConfig {
        return new this().getFormFieldConfig(fieldKey)
    }
    /**
     * 获取当前对象的类名。
     * @returns {string} 当前对象的类名。
     */
    private getClassName(): string {
        return getClassName(this.constructor) || this.constructor.name
    }
    /**
     * 获取表格字段列表。
     * 私有方法，请调用静态方法👆👆👆
     * @returns {string[]} 返回一个字符串数组，包含表格的字段列表。
     */
    private getTableFieldList(): string[] {
        return getTableFieldList(this)
    }

    /**
     * 获取指定字段键的表字段配置。
     * 私有方法，请调用静态方法👆👆👆
     * @param fieldKey 字段的键，用于从表字段配置中检索特定的字段配置。
     * @returns 返回一个符合 AirTableFieldConfig 接口的字段配置对象。
     */
    private getTableFieldConfig(fieldKey: string): AirTableFieldConfig {
        return getTableFieldConfig(this, fieldKey)
    }


    /**
     * 获取表字段的名称。
     * 私有方法，请调用静态方法👆👆👆
     * @param fieldKey 字段键，用于标识特定的表字段。
     * @returns 返回字段的标签名称。如果在表字段配置中找到，则返回配置中的标签名称；如果未找到，则返回通用的字段名称。
     */
    private getFieldName(fieldKey: string): string {
        return getTableFieldConfig(this, fieldKey)?.label || getFieldName(this, fieldKey)
    }

    private getSearchFieldList() {
        return getSearchFieldList(this)
    }

    private getSearchFieldConfig(fieldKey: string): AirSearchFieldConfig {
        return getSearchFieldConfig(this, fieldKey)
    }

    private getFormFieldList() {
        return getFormFieldList(this)
    }

    private getFormFieldConfig(fieldKey: string): AirFormFieldConfig {
        return getFormFieldConfig(this, fieldKey)
    }

    /**
     * # 将当前实例复制到一个新实例上
     */
    copy(): this {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this
    }

    /**
     * # 将当前实例转换为 JSON 对象
     */
    toJson(): Record<string, any> {
        return instanceToPlain(this)
    }

    toJsonString(): string {
        return JSON.stringify(this.toJson())
    }


    /**
     * # 移除指定字段
     * @param fields 字段列表
     */
    exclude(...fields: string[]): this {
        const fieldList = Object.keys(this)
        for (let field of fieldList) {
            if (fields.includes(field)) {
                delete (this as any)[field]
                // (this.as any)[field] = undefined
            }
        }
        return this
    }

    /**
     * # 用指定的数据对当前实例进行覆盖
     * ---
     * # 💡 相同字段才会覆盖上去
     * @param obj 覆盖对象
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recoverBy(obj: any): this {
        return Object.assign(this, obj)
    }

} 