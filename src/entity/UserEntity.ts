import { BaseEntity } from "@/base/BaseEntity";
import { Expose, Type } from "class-transformer";
import { RoleEntity } from "./RoleEntity";

export class UserEntity extends BaseEntity {
    
    @Expose() userName?: string

    @Expose() phoneNumber?: string

    @Type(() => RoleEntity)
    @Expose() roleInfo?: RoleEntity[]
}