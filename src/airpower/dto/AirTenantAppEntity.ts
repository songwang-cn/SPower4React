import { Expose, Type } from 'class-transformer'
import { AirEntity } from './AirEntity'
import { IApp } from '../interface/IApp'
import { AirMenuEntity } from './AirMenuEntity'

/**
 * # 租户的应用信息
 * @author SPower
 */
export class AirTenantAppEntity extends AirEntity implements IApp {
    /**
     * # 所属租户ID
     */
    @Expose() tenantId!: number

    /**
     * # 所属租户编码
     */
    @Expose() tenantCode!: string

    @Expose() appName!: string

    @Expose() appCode!: string

    @Expose() mobileIcon!: string

    @Expose() mobileDomain!: string

    @Expose() mobileVersionId!: number

    @Expose() pcIcon!: string

    @Expose() pcDomain!: string

    @Expose() televisionIcon!: string

    @Expose() televisionDomain!: string

    @Expose() televisionVersionId!: number

    @Type(() => AirMenuEntity)
    @Expose() menuInfoList!: AirMenuEntity[]

    /**
     * # 企业应用别名
     */
    @Expose() aliasName!: string

    /**
     * # 企业应用版权信息
     */
    @Expose() copyright!: string

    /**
     * # 企业应用Logo
     */
    @Expose() logo!: string
}
