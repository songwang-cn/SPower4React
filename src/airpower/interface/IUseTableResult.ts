/* eslint-disable no-unused-vars */
import { AirEntity } from '../dto/AirEntity'
import { AirAbstractService } from '../service/AirAbstractService'
import { ITableHookResult } from './ITableHookResult'

/**
 * # 表格的Hook标准返回
 */
export interface IUseTableResult<E extends AirEntity, S extends AirAbstractService<E>> extends ITableHookResult<E, S> {

  /**
   * # 编辑事件
   *
   * @param row 选择的行
   */
  onEdit: (row: E) => void,

  /**
   * # 删除事件
   *
   * @param row 选择的行
   */
  onDelete: (row: E) => void,
}
