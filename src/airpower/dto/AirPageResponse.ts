import { Expose } from 'class-transformer'
import { AirPage } from './AirPage'

/**
 * # 响应分页类
 * @author Hamm
 */
export class AirPageResponse extends AirPage {
  /**
   * # 总行数
   */
  @Expose() total = 0
}
