import { Expose } from "class-transformer";
import { AirModel } from "../model/AirModel";

export class AirEntity extends AirModel {
    constructor(id?: number) {
        super()
        if (id) {
            this.id = id
        }
    }

    @Expose() id!: number
}