import { AirEntity } from '../dto/AirEntity'
import { AirRequest } from '../dto/AirRequest'

/**
 * # 导出的数据模型
 * @author SPower
 */
export class AirExportModel<E extends AirEntity> {
  /**
   * # 导出请求的API地址
   */
  url!: string

  /**
   * # 请求的参数
   */
  param!: AirRequest<E>
}
