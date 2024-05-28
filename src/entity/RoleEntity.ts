import { BaseEntity } from "@/base/BaseEntity";
import { Expose } from "class-transformer";

export class RoleEntity extends BaseEntity {

    constructor(param?: Record<string, any>) {
        super()
        this.id = param?.id
        this.roleName = param?.roleName
        this.roleCode = param?.roleCode
    }

    @Expose() roleName?: string

    @Expose() roleCode?: string
}