import { AppConfig } from '@/config/AppConfig'
import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { AirDateTimeType } from '../enum/AirDateTimeType'
import { IRecord } from '../interface/IRecord'
import { AirFieldConfig } from './AirFieldConfig'
import { IFormFieldConfig } from '../interface/IFormFieldConfig'
import { AirTrim } from '../enum/AirTrim'
import { AirRecordArray } from '../model/AirRecordArray'

/**
 * # 表单字段配置实现类
 * @author Hamm
 */
export class AirFormFieldConfig extends AirFieldConfig implements IFormFieldConfig {
  dateValueFormatter = AirDateTimeFormatter.TIMESTAMP

  dateShowFormatter?: AirDateTimeFormatter

  dateType?: AirDateTimeType

  max = AppConfig.maxNumber

  min = AppConfig.minNumber

  maxLength?: number

  minLength?: number

  placeholder?: string

  fieldName?: string

  isTextarea?: boolean

  isNumber?: boolean

  orderNumber = 1

  precision: number = AppConfig.defaultPrecision

  isPassword?: boolean

  prefixIcon?: string

  suffixIcon?: string

  suffixText?: string

  clearable = true

  multiple = false

  multipleLimit = 0

  collapseTags = true

  filterable = true

  showPassword = true

  showLimit?: boolean

  enumRecord?: AirRecordArray<IRecord>

  checkStrictly = true

  emitPath = false

  showAllLevels = false

  autoSize = true

  minRows = AppConfig.defaultTextareaMinRows

  maxRows = AppConfig.defaultTextareaMaxRows

  isSwitch = false

  hideSwitchLabel = false

  isRadio = false

  isRadioButton = false

  defaultValue?: string | number | boolean

  disableSwitchColor = false

  trim = AirTrim.NONE

  isUnique = false

  isChinese = false

  isMobilePhone = false

  isRequired = false

  isRequiredNumber = false

  isTelPhone = false

  isPhone = false

  isEmail = false

  regExp = undefined
}
