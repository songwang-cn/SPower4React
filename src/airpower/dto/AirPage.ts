import { Expose } from 'class-transformer'
import { AirModel } from '../model/AirModel'

/**
 * # 分页类
 * @author Hamm
 */
export class AirPage extends AirModel {
  /**
   * # 分页页数 默认第一页
   */
  @Expose() currentPage = 1

  /**
   * # 默认分页数量 默认20
   */
  @Expose() currentPageSize = 20
}
