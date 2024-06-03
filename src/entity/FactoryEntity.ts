import { BaseEntity } from "@/base/BaseEntity";
import { Expose } from "class-transformer";

export class FactoryEntity extends BaseEntity {

    @Expose() name?: string

    @Expose() dna?: string

}