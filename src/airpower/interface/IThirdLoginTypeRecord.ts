import { IRecord } from './IRecord'

export interface IThirdLoginTypeRecord extends IRecord {
  /**
   * # 第三方登录Oauth地址
   */
  oauthUrl: string

  /**
   * # 第三方登录ICON
   */
  icon: string

  /**
   * # 第三方登录appKey
   */
  appKey: string

  /**
   * # Referer关键字 用于判断code来源
   */
  refererKeyword: string

  /**
   * # Referer关键字 用于判断code来源 沙箱
   */
  refererKeywordSandbox?: string
}
