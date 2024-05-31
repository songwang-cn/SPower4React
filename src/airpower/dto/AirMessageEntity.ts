import { Expose, Type } from 'class-transformer'
import { AirEntity } from './AirEntity'
import { AirMessageBodyEntity } from './AirMessageBodyEntity'
import { AirTenantAppEntity } from './AirTenantAppEntity'

/**
 * # 消息记录实体
 * @author SPower
 */
export class AirMessageEntity extends AirEntity {
    @Expose() isRead!: boolean

    @Expose() messageId!: number

    /**
     * # 消息体
     */
    @Type(() => AirMessageBodyEntity)
    @Expose({ name: 'messageInfo' }) body!: AirMessageBodyEntity

    @Type(() => AirTenantAppEntity)
    @Expose({ name: 'appInfo' }) appInfo!: AirTenantAppEntity
}
