/* eslint-disable no-unused-vars */

import { AirEntity } from '../dto/AirEntity'
import { IValidateRule } from './IValidateRule'

/**
 * # Editor的Hook可选配置
 */
export interface IUseEditorOption<E extends AirEntity> {
  /**
   * # 自定义验证
   */
  customRules?: IValidateRule,

  /**
   * 显示操作具体消息
   */
  showMsg?: boolean,

  /**
   * # 请求前拦截器
   * ---
   * 💡 参数为发起请求的数据,请处理后返回
   *
   * @param submitData 实体
   */
  beforeSubmit?: (submitData: E) => E | void

  /**
   * # 查到详情后的事件
   * ---
   * 💡 参数为响应的数据,请处理后返回
   *
   * @param detailData 实体
   */
  afterGetDetail?: (detailData: E) => E | void

}
