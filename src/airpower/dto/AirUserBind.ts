import { Expose } from 'class-transformer'
import { AirModel } from '../model/AirModel'

/**
 * # 用户绑定信息
 */
export class AirUserBind extends AirModel {
  /**
   * # 是否绑定微信
   */
  @Expose() isBindWechat!: boolean
}
