import { BaseEntity } from "@/base/BaseEntity";
import { FieldName } from "@/airpower/decorator/FieldName";
import { TableField } from "@/airpower/decorator/TableField";
import { Expose, Type } from "class-transformer";
import { FactoryEntity } from "./FactoryEntity";
import { AirRecordArray } from "@/airpower/model/AirRecordArray";
import { AirColor } from "@/airpower/enum/AirColor";

export enum DeviceType {
    Produce = 1,
    Maintenance = 2,
    Energy = 3
}

export const DeviceTypeRecord = AirRecordArray.create([
    {
        key: DeviceType.Produce,
        label: '生产设备',
        color: AirColor.SUCCESS
    },
    {
        key: DeviceType.Maintenance,
        label: '维保设备',
        color: AirColor.WARNING
    },
    {
        key: DeviceType.Energy,
        label: '能源设备',
        color: AirColor.ERROR
    }
])

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

    @FieldName('租户编码')
    @TableField()
    @Expose() tenantCode?: string

    @FieldName('是否生产设备')
    @TableField({
        width: 120,
        isBoolean: true
    })
    @Expose() isProduceDevice?: boolean


    @FieldName('是否维保设备')
    @TableField({
        width: 120,
        isBoolean: true
    })
    @Expose() isMaintenanceDevice?: boolean

    @FieldName('是否能源设备')
    @TableField({
        width: 120,
        isBoolean: true,
        showLight: true
    })
    @Expose() isEnergyDevice?: boolean

    @FieldName('是否数采设备')
    @TableField({
        width: 120,
        isBoolean: true
    })
    @Expose() isDataCollectionDevice?: boolean

    @Expose()
    @FieldName('设备类型')
    @TableField({
        width: 120,
        enumRecord: DeviceTypeRecord,
        showLight: true
    })
    type?: DeviceType

}