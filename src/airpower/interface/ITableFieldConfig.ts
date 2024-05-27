import { IFieldConfig } from "./IFieldConfig";

export interface ITableFieldConfig extends IFieldConfig {
    hide?: boolean

    isCopyField?: boolean
}