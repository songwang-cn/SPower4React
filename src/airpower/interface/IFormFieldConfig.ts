import { AirDateTimeFormatter } from '../enum/AirDateTimeFormatter'
import { AirDateTimeType } from '../enum/AirDateTimeType'
import { AirTrim } from '../enum/AirTrim'
import { AirRecordArray } from '../model/extend/AirRecordArray'
import { IFieldConfig } from './IFieldConfig'
import { IRecord } from './IRecord'

/**
 * # 表单的字段配置接口
 * @author Hamm
 */
export interface IFormFieldConfig extends IFieldConfig {
  /**
   * # 回传值的格式化方式
   */
  dateValueFormatter?: AirDateTimeFormatter | string;

  /**
   * # 显示值的格式化方式
   */
  dateShowFormatter?: AirDateTimeFormatter | string;

  /**
   * # 时间日期控件格式
   */
  dateType?: AirDateTimeType;

  /**
   * # 最大数字
   */
  max?: number;

  /**
   * # 最小数字
   */
  min?: number;

  /**
   * # 最大长度
   */
  maxLength?: number;

  /**
   * # 最小长度
   */
  minLength?: number;

  /**
   * # 排序 越大越靠前
   */
  orderNumber?: number;

  /**
   * # 占位文本
   * 优先级: ```AInput```传入 > ```@FormField``` > 自动生成
   */
  placeholder?: string;

  /**
   * # 字段名称
   */
  fieldName?: string;

  /**
   * # 是否文本域
   */
  isTextarea?: boolean;

  /**
   * # 是否是数字
   */
  isNumber?: boolean;

  /**
   * # 数字精度(小数的位数)
   * 如为0,则是整数,不允许输入小数
   *
   * 默认为 ```AppConfig.defaultPrecision``` 的配置
   */
  precision?: number

  /**
   * # 是否显示清除按钮
   */
  clearable?: boolean;

  /**
   * # 是否密码框
   */
  isPassword?: boolean;

  /**
   * # 前置图标名称
   *
   * 只支持 [Element Plus内置的图标](https://url.hamm.cn/5yc2d)
   */
  prefixIcon?: string;

  /**
   * # 后置图标名称
   *
   * 只支持 [Element Plus内置的图标](https://url.hamm.cn/5yc2d)
   */
  suffixIcon?: string;

  /**
   * # 后置文字
   */
  suffixText?: string;

  /**
   * # 是否多选
   */
  multiple?: boolean;

  /**
   * # 是否收起多选标签
   */
  collapseTags?: boolean;

  /**
   * # 是否可筛选
   *
   * 如为 ```AInput``` 传入了 ```onSearch``` 回调方法, 则进行自定义的筛选
   */
  filterable?: boolean;

  /**
   * # 限制最多选择多少个
   */
  multipleLimit?: number;

  /**
   * # 是否显示密码预览按钮
   */
  showPassword?: boolean;

  /**
   * # 父子关联
   */
  checkStrictly?: boolean;

  /**
   * # 显示输入限制
   * AppConfig中支持配置全局默认状态 如
   *
   * ```typescript
   * AppConfig.defaultInputShowLimit = true
   * AppConfig.defaultTextAreaShowLimit = false
   * ```
   */
  showLimit?: boolean;

  /**
   * # 下拉选择枚举数据
   *
   * 如 ```AInput``` 传入了自定义的数据, 则此项失效
   */
  enumRecord?: AirRecordArray<IRecord>;

  /**
   * # 返回全路径的值
   */
  emitPath?: boolean;

  /**
   * # 显示全路径
   */
  showAllLevels?: boolean;

  /**
   * # TextArea是否自适应
   *
   * ```AInput```如配置了 ```textarea:true``` 此项生效, 默认为```true```
   */
  autoSize?: boolean;

  /**
   * # 最小行数
   */
  minRows?: number;

  /**
   * # 最大行数
   */
  maxRows?: number;

  /**
   * # 是否使用Switch控件
   */
  isSwitch?: boolean;

  /**
   * # 使用Switch控件时是否隐藏Label文字
   *
   * ```@FormField``` 的 ```isSwitch``` 配置为 ```true``` 时生效
   */
  hideSwitchLabel?: boolean;

  /**
   * # 是否使用Radio控件
   */
  isRadio?: boolean;

  /**
   * # 使用Radio控件时用按钮的样式
   * ```@FormField``` 的 ```isRadio``` 配置为 ```true``` 时生效
   */
  isRadioButton?: boolean;

  /**
   * # 表单的默认值
   */
  defaultValue?: boolean | string | number;

  /**
   * # switch不使用枚举配置的颜色
   * ```@FormField``` 的 ```isSwitch``` 配置为 ```true``` 时生效
   */
  disableSwitchColor?: boolean;

  /**
   * # 输入框是否去除空格
   *
   * - 默认: AirTrim.NONE
   * @see AirTrim
   */
  trim?: AirTrim

  /**
   * # 是否唯一字段 后端即将支持
   * ---
   * ### 💡 支持传入 ```boolean``` 和 ```string```
   * - 如传入 ```有效字符串``` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 ```true``` 则认为需要校验且自动生成校验失败的报错信息
   */
  isUnique?: boolean | string

  /**
   * # 是否是纯中文
   * ---
   * ### 💡 支持传入 ```boolean``` 和 ```string```
   * - 如传入 ```有效字符串``` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 ```true``` 则认为需要校验且自动生成校验失败的报错信息
   */
  isChinese?: boolean | string

  /**
   * # 是否是手机号
   * ---
   * ### 💡 支持传入 ```boolean``` 和 ```string```
   * - 如传入 ```有效字符串``` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 ```true``` 则认为需要校验且自动生成校验失败的报错信息
   */
  isMobilePhone?: boolean | string

  /**
   * # 是否是座机电话
   * ---
   * ### 💡 支持传入 ```boolean``` 和 ```string```
   * - 如传入 ```有效字符串``` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 ```true``` 则认为需要校验且自动生成校验失败的报错信息
   */
  isTelPhone?: boolean | string

  /**
   * # 是否是电子邮箱
   * ---
   * ### 💡 支持传入 ```boolean``` 和 ```string```
   * - 如传入 ```有效字符串``` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 ```true``` 则认为需要校验且自动生成校验失败的报错信息
   */
  isEmail?: boolean | string

  /**
   * # 是否是座机电话或手机
   * ---
   * ### 💡 支持传入 ```boolean``` 和 ```string```
   * - 如传入 ```有效字符串``` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 ```true``` 则认为需要校验且自动生成校验失败的报错信息
   */
  isPhone?: boolean | string

  /**
   * # 是否必填(字符串类型)
   * ---
   * ### 💡 支持传入 ```boolean``` 和 ```string```
   * - 如传入 ```有效字符串``` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 ```true``` 则认为需要校验且自动生成校验失败的报错信息
   */
  isRequired?: boolean | string

  /**
   * # 是否必填(数字类型)
   * ---
   * ### 💡 支持传入 ```boolean``` 和 ```string```
   * - 如传入 ```有效字符串``` 则认为需要校验, 内容即是校验失败的报错信息
   * - 如传入 ```true``` 则认为需要校验且自动生成校验失败的报错信息
   */
  isRequiredNumber?: boolean | string

  /**
   * # 正则表达式对象
   */
  regExp?: RegExp
}
