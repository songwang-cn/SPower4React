import { ITableFieldConfig } from "../interface/ITableFieldConfig";
import { AirFieldConfig } from "./AirFieldConfig";

export class AirTableFieldConfig extends AirFieldConfig implements ITableFieldConfig {
    hide = false

    isCopyField = false
}