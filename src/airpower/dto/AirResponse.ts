import { Expose } from 'class-transformer'
import { AirEntity } from './AirEntity'
import { AirPageResponse } from './AirPageResponse'

/**
 * # 响应泛型类
 * @author SPower
 */
export class AirResponse<E extends AirEntity> extends AirPageResponse {
    @Expose() items: E[] = []
}
