import { IFieldConfig } from "./IFieldConfig";

export interface ITableFieldConfig extends IFieldConfig {

    width?: number | 'auto'

    hide?: boolean

    isCopyField?: boolean

    payload?: string

    payloadArray?: string

    isTag?: boolean
}