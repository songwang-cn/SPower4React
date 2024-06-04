import { AirColor } from "../enum/AirColor";
import { IRecord } from "../interface/IRecord";
import { ITableFieldConfig } from "../interface/ITableFieldConfig";
import { AirRecordArray } from "../model/AirRecordArray";
import { AirFieldConfig } from "./AirFieldConfig";

export class AirTableFieldConfig extends AirFieldConfig implements ITableFieldConfig {

    width = undefined

    hide = false

    isCopyField = false

    payload = ''

    payloadArray = ''

    isTag = false

    isBoolean = false

    trueColor = AirColor.SUCCESS

    falseColor = AirColor.ERROR

    showLight = false

    enumRecord?: AirRecordArray<IRecord>
}