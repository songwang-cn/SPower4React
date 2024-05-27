import { BaseEntity } from "@/airpower/base/BaseEntity";
import { FieldName } from "@/airpower/decorator/FieldName";
import { TableField } from "@/airpower/decorator/TableField";
import { Expose } from "class-transformer";

export class DeviceEntity extends BaseEntity {

    constructor(param: Record<string, any>) {
        super()
        this.id = param.id
        this.code = param.code
        this.name = param.name
        this.type = param.type
        this.status = param.status
    }

    @TableField()
    @FieldName('设备名称')
    @Expose() name?: string

    @TableField({
        label: '设备编码',
        isCopyField: true
    })
    @Expose() code?: string


    @TableField({
        label: '类型'
    })
    @Expose() type?: string


    @TableField({
        label: '状态'
    })
    @Expose() status?: string

    @TableField({
        label: '创建时间',
        hide: true
    })
    @Expose() createdTime?: string

}