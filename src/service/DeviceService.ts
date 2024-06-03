import { AirAbstractService } from "@/airpower/service/AirAbstractService";
import { DeviceEntity } from "@/entity/DeviceEntity";

export class DeviceService extends AirAbstractService<DeviceEntity> {

    entityClass = DeviceEntity

    baseUrl = 'baDevice'
}