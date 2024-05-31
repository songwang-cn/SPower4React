import { Expose } from 'class-transformer'
import { AirModel } from '../model/AirModel'

/**
 * # 分页类
 * @author SPower
 */
export class AirPage extends AirModel {
  /**
   * # 分页页数 默认第一页
   */
  @Expose() currentPage = 1

  /**
   * # 默认分页数量 默认20
   */
  @Expose() currentPageSize = 2


  setCurrentPage(currentPage: number) {
    this.currentPage = currentPage
    return this
  }

  setCurrentPageSize(currentPageSize: number) {
    this.currentPageSize = currentPageSize
    return this
  }
}
