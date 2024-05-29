/* eslint-disable no-unused-vars */
import { Ref } from 'vue'
import { AirEntity } from '../dto/AirEntity'
import { AirPage } from '../dto/AirPage'
import { AirSort } from '../dto/AirSort'
import { AirRequest } from '../dto/AirRequest'
import { AirResponse } from '../dto/AirResponse'
import { AirAbstractService } from '../service/AirAbstractService'

/**
 * # 表格Hook标准返回
 */
export interface ITableHookResult<E extends AirEntity, S extends AirAbstractService<E>> {

  /**
   * # 当前绑定的Loading状态
   * ---
   * 💡 请随意 ```v-loading``` 到你需要的地方
   */
  isLoading: Ref<boolean>,

  /**
   * # 响应数据
   */
  response: Ref<AirResponse<E>>,

  /**
   * # 请求数据
   */
  request: Ref<AirRequest<E>>,

  /**
   * # 返回的单页数据列表
   */
  list: Ref<E[]>,

  /**
   * # 选中的数据列表
   */
  selectList: Ref<E[]>,

  /**
   * # 实体实例
   */
  entity: E,

  /**
   * # Service实例
   */
  service: S,

  /**
   * # 刷新数据 返回第一页 恢复默认搜索条件
   */
  reloadData: () => void,

  /**
   * # 多选选择事件
   *
   * @param list 选择的行数组
   */
  onSelected: (list: E[]) => void,

  /**
   * # 搜索事件
   *
   * @param request 请求对象
   */
  onSearch: (request: AirRequest<E>) => void,

  /**
   * # 分页变更事件
   *
   * @param page 分页对象
   */
  onPageChanged: (page: AirPage) => void,

  /**
   * # 排序变更事件
   *
   * @param sort 排序对象
   */
  onSortChanged: (sort: AirSort) => void,

  /**
   * # 推荐使用 onSearch
   * @deprecated
   *
   * @param request 请求对象
   */
  onGetList: (request: AirRequest<E>) => void,

  /**
   * # 详情事件
   *
   * @param row 选择的行
   */
  onDetail: (row: E) => void,

  /**
   * # 添加事件
   */
  onAdd: () => void,
}
