/* eslint-disable no-unused-vars */
import { Ref } from 'vue'
import { AirEntity } from '../dto/AirEntity'
import { ITableHookResult } from './ITableHookResult'
import { AirAbstractService } from '../service/AirAbstractService'

/**
 * # 选择器Hook的标准返回
 */
export interface IUseSelectorResult<E extends AirEntity, S extends AirAbstractService<E>> extends ITableHookResult<E, S> {

  /**
   * # Selector的标题
   */
  title: Ref<string>,
}
