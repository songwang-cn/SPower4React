import { BaseEntity } from "@/base/BaseEntity";
import { FieldName } from "@/airpower/decorator/FieldName";
import { TableField } from "@/airpower/decorator/TableField";
import { Expose, Type } from "class-transformer";
import { FactoryEntity } from "./FactoryEntity";

export class DeviceEntity extends BaseEntity {
    @TableField()
    @FieldName('设备名称')
    @Expose() name?: string

    @TableField({
        label: '设备编码',
        isCopyField: true
    })
    @Expose() code?: string


    @TableField({
        label: '工厂结构',
        payload: 'name',
    })
    @Type(() => FactoryEntity)
    @Expose() factoryModelInfo?: FactoryEntity

}