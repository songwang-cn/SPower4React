import { AirTableFieldConfig } from "../config/AirTableFieldConfig";
import { getTableFieldList, getTableFieldConfig } from "../decorator/TableField";
import { getFieldName } from "../decorator/FieldName";

export class AModel {
    static getTableFieldList(): string[] {
        return new this().getTableFieldList()
    }

    static getTableFieldConfig(key: string): AirTableFieldConfig {
        return new this().getTableFieldConfig(key)
    }

    static getTableFieldName(key: string) {
        return new this().getTableFieldName(key)
    }

    getTableFieldList(): string[] {
        return getTableFieldList(this)
    }

    getTableFieldConfig(key: string): AirTableFieldConfig {
        return getTableFieldConfig(this, key)
    }

    getTableFieldName(key: string) {
        return getFieldName(this, key) || getTableFieldConfig(this, key)?.label
    }

    /**
     * # 将当前实例复制到一个新实例上
     */
    copy(): this {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return this
    }

} 