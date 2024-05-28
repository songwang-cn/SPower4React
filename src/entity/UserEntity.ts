import { BaseEntity } from "@/base/BaseEntity";
import { Expose, Type } from "class-transformer";
import { RoleEntity } from "./RoleEntity";

export class UserEntity extends BaseEntity {

    constructor(param?: Record<string, any>) {
        super()
        this.id = param?.id
        this.userName = param?.userName
        this.phoneNumber = param?.phoneNumber
        this.roleInfo = param?.roleInfo
    }

    @Expose() userName?: string

    @Expose() phoneNumber?: string

    @Type(() => RoleEntity)
    @Expose() roleInfo?: RoleEntity[]
}