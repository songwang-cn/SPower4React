import { AirBetweenType } from '../enum/AirBetweenType'
import { IFieldConfig } from './IFieldConfig'
import { IRecord } from '../interface/IRecord'

/**
 * # 表格的字段配置接口
 * @author SPower
 */
export interface ISearchFieldConfig extends IFieldConfig {
  /**
   * # 是否隐藏搜索
   */
  hide?: boolean;

  /**
   * # 排序 越大越靠上边
   */
  orderNumber?: number;

  /**
   * # 枚举数据集
   */
  enumRecord?: IRecord[];

  /**
   * # 是否多选
   */
  multiple?: boolean

  /**
   * # 搜索宽度
   */
  width?: number

  /**
   * # 是否可筛选
   */
  filterable?: boolean;

  /**
   * # 是否是区间控件
   * 可配置 ```betweenType```,```betweenMin```,```betweenMax``` 等参数
   */
  between?: boolean;

  /**
   * # 区间类型
   */
  betweenType?: AirBetweenType;

  /**
   * # 区间最小值
   */
  betweenMin?: number;

  /**
   * # 区间最大值
   */
  betweenMax?: number;

}
