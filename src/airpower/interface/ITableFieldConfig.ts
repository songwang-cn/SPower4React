import { AirRecordArray } from "../model/AirRecordArray";
import { IFieldConfig } from "./IFieldConfig";
import { IRecord } from "./IRecord";

export interface ITableFieldConfig extends IFieldConfig {

    width?: number | 'auto'

    align?: string

    hide?: boolean

    isCopyField?: boolean

    payload?: string

    payloadArray?: string

    /**
     * 表格中该数据展示为 tag 标签
     */
    isTag?: boolean

    /**
     * 仅支持 字段为boolean 或 1-是,0-否
     */
    isBoolean?: boolean

    trueColor?: string

    falseColor?: string

    /**
     * 是否显示状态灯
     */
    showLight?: boolean

    enumRecord?: AirRecordArray<IRecord>
}