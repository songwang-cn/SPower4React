import { BaseEntity } from "@/base/BaseEntity";
import { FieldName } from "@/airpower/decorator/FieldName";
import { TableField } from "@/airpower/decorator/TableField";
import { Expose } from "class-transformer";
import { UserEntity } from "./UserEntity";

export class DeviceEntity extends BaseEntity {

    constructor(param?: Record<string, any>) {
        super()
        this.id = param?.id
        this.code = param?.code
        this.name = param?.name
        this.type = param?.type
        this.status = param?.status
        this.responseUser = param?.responseUser
        this.sons = param?.sons
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
        label: '类型',
        payload: 'typeName',
    })
    @Expose() type?: string


    @TableField({
        label: '状态'
    })
    @Expose() status?: string

    @TableField({
        label: '状态1'
    })
    @Expose() status1?: string

    @TableField({
        label: '状态2'
    })
    @Expose() status2?: StringConstructor

    @TableField({
        width: 300,
        payloadArray: 'userName',
        isCopyField: true,
        isTag: true
    })
    @FieldName('负责人')
    @Expose() responseUser?: UserEntity[]

    @Expose()
    @FieldName('子设备')
    @TableField({
        payloadArray: 'name',
        isTag: true
    })
    sons?: this[]

}