import { AirBetweenType } from '../enum/AirBetweenType'
import { AirFieldConfig } from './AirFieldConfig'
import { ISearchFieldConfig } from '../interface/ISearchFieldConfig'
import { IRecord } from '../interface/IRecord'
import { AirRecordArray } from '../model/AirRecordArray'

/**
 * # 查询字段配置实现类
 * @author Hamm
 */
export class AirSearchFieldConfig extends AirFieldConfig implements ISearchFieldConfig {
  hide = false

  orderNumber = 1

  enumRecord?: AirRecordArray<IRecord>

  width = 200

  between = false

  betweenType = AirBetweenType.DATE

  betweenMin = 0

  betweenMax = 100

  filterable = true
}
