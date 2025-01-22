import { BaseEntity } from "@/base/BaseEntity";
import { Expose } from "class-transformer";

export class RoleEntity extends BaseEntity {

    @Expose() roleName?: string

    @Expose() roleCode?: string
}