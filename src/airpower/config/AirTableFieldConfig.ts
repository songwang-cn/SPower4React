import { ITableFieldConfig } from "../interface/ITableFieldConfig";
import { AirFieldConfig } from "./AirFieldConfig";

export class AirTableFieldConfig extends AirFieldConfig implements ITableFieldConfig {

    width = undefined

    hide = false

    isCopyField = false

    // 加载对象某个字段
    payload = ''

    // 加载对象数组某个字段
    payloadArray = ''

    isTag = false
}