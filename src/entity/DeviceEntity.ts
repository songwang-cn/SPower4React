import { BaseEntity } from "@/base/BaseEntity";
import { FieldName } from "@/airpower/decorator/FieldName";
import { TableField } from "@/airpower/decorator/TableField";
import { Expose, Type } from "class-transformer";
import { FactoryEntity } from "./FactoryEntity";
import { AirRecordArray } from "@/airpower/model/AirRecordArray";
import { AirColor } from "@/airpower/enum/AirColor";
import { SearchField } from "@/airpower/decorator/SearchField";
import { ClassName } from "@/airpower/decorator/ClassName";
import { FormField } from "@/airpower/decorator/FormField";
import { AirDateTimeType } from "@/airpower/enum/AirDateTimeType";

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

@ClassName('设备')
export class DeviceEntity extends BaseEntity {

    @TableField({
        label: '设备编码',
        isCopyField: true
    })
    @FormField({
        isRequired: true
    })
    @Expose() code?: string

    @TableField({
        isCopyField: true
    })
    @SearchField()
    @FormField()
    @FieldName('设备名称')
    @Expose() name?: string


    @TableField({
        label: '所在位置',
        payload: 'name'
    })
    @Type(() => FactoryEntity)
    @Expose() factoryModelInfo?: FactoryEntity

    @FieldName('租户编码')
    @TableField()
    @Expose() tenantCode?: string

    @FieldName('是否生产设备')
    @SearchField({
        enumRecord: AirRecordArray.create([
            {
                key: 1,
                label: '是'
            },
            {
                key: 0,
                label: '否'
            }
        ])
    })
    @FormField({
        isRadioButton: true,
        enumRecord: AirRecordArray.create([
            {
                key: true,
                label: '是'
            },
            {
                key: false,
                label: '否'
            }
        ])
    })
    @Expose() isProduceDevice?: boolean


    @FieldName('是否维保设备')
    @FormField({
        isSwitch: true
    })
    @Expose() isMaintenanceDevice?: boolean

    @FieldName('是否能源设备')
    @Expose() isEnergyDevice?: boolean

    @FieldName('是否数采设备')
    @Expose() isDataCollectionDevice?: boolean

    @Expose()
    @FieldName('设备类型')
    @SearchField({
        enumRecord: DeviceTypeRecord,
    })
    @FormField({
        enumRecord: DeviceTypeRecord,
        multiple: true
    })
    type?: DeviceType

    @Expose()
    @FormField({
        dateType: AirDateTimeType.DATETIME
    })
    declare createdTime?: number

}