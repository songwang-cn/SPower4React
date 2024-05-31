import { AirValidator } from '../model/AirValidator'

/**
 * # 表单验证规则
 * @author SPower
 */
export interface IValidateRule {
  /**
   * # 字段名:[验证器]
   */
  [key: string]: AirValidator[]
}
