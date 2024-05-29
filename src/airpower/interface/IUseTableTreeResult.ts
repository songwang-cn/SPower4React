/* eslint-disable no-unused-vars */
import { AirEntity } from '../dto/AirEntity'
import { AirAbstractService } from '../service/AirAbstractService'
import { IUseTableResult } from './IUseTableResult'

/**
 * # 树表格的Hook标准返回
 */
export interface IUseTableTreeResult<E extends AirEntity, S extends AirAbstractService<E>> extends IUseTableResult<E, S> {
  /**
   * # 表格行的添加按钮点击事件
   */
  onAddRow: (row: E) => void
}
