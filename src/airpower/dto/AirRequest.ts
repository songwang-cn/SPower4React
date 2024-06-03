import { ClassConstructor, Expose, Type } from 'class-transformer'
import { AirSort } from './AirSort'
import { AirEntity } from './AirEntity'
import { AirPage } from './AirPage'
import { AirModel } from '../model/AirModel'
import { AirClassTransformerHelper } from '../helper/AirClassTransformerHelper'

/**
 * # 请求泛型类
 * @author SPower
 */
export class AirRequest<E extends AirEntity> extends AirModel {

  @Expose() queryParams!: E

  /**
   * # 搜索关键词
   */
  @Expose() keyword!: string

  /**
   * # 排序对象
   */
  @Expose() sort = new AirSort()

  @Type(() => AirPage)
  @Expose() page = new AirPage()

  /**
   * # 💡 创建一个Request对象
   * ---
   * @param queryClass [可选]查询参数的类
   */
  constructor(queryClass?: ClassConstructor<E>) {
    super()
    if (queryClass) {
      this.queryParams = AirClassTransformerHelper.parse({}, queryClass)
    }
  }

  setPage(page: AirPage) {
    this.page = page
    return Object.assign(new AirRequest(), this)
  }

  setQueryParams(queryParams: E): AirRequest<E> {
    this.queryParams = queryParams
    return Object.assign(new AirRequest(), this)
  }
}
