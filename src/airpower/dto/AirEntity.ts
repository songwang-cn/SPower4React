import { Expose } from "class-transformer";
import { AModel } from "../model/AModel";

export class AirEntity extends AModel {
    constructor(id?: number) {
        super()
        if (id) {
            this.id = id
        }
    }

    @Expose() id!: number
}