/* eslint-disable no-unused-vars */
import { AirEntity } from '../dto/AirEntity'
import { ITableHookOption } from './ITableHookOption'
/**
 * # TableList的Hook可选配置
 */
export interface IUseTableOption<E extends AirEntity> extends ITableHookOption<E>{
  /**
   * # 添加行的子项的前置拦截方法
   * ---
   * 💡 参数为发起请求的数据,请处理后返回
   *
   * @param param 添加的数据
   * @param row 当前行数据
   */
  beforeAddRow?: (param: E, row: E) => E | void
}
