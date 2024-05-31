import { Expose } from 'class-transformer'
import { AirModel } from '../model/AirModel'
import { AirSortType } from '../enum/AirSortType'

/**
 * # 排序对象
 * @author SPower
 */
export class AirSort extends AirModel {
  constructor(columnName = 'updatedTime', sortType = AirSortType.DESC) {
    super()
    this.columnName = columnName
    this.sortType = sortType
  }

  /**
   * # 排序字段 默认updatedTime
   */
  @Expose() columnName = 'updatedTime'

  /**
   * # 排序方式 默认 desc
   */
  @Expose() sortType = AirSortType.DESC
}
