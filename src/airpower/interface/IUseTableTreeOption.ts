/* eslint-disable no-unused-vars */
import { IUseTableOption } from './IUseTableOption'
import { ITree } from './ITree'
/**
 * # TableList的Hook可选配置
 */
export interface IUseTableTreeOption<E extends ITree> extends IUseTableOption<E>{
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
