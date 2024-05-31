import { Expose } from 'class-transformer'
import { FieldName } from '../decorator/CustomName'
import { AirEntity } from '../dto/AirEntity'

/**
 * # 租户信息
 * @author SPower
 */
export class AirTenantEntity extends AirEntity {
  /**
   * # 租户名称
   */
  @FieldName('租户名称')
  @Expose() tenantName!: string

  /**
   * # 租户编码
   */
  @FieldName('租户编码')
  @Expose() tenantCode!: string

  /**
   * # 租户logo
   */
  @FieldName('租户logo')
  @Expose() logo!: string
}
