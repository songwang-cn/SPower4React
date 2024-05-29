/* eslint-disable no-unused-vars */
import { AirEntity } from '../dto/AirEntity'

/**
 * # 应用标准结构接口
 * @author Hamm
 */
export interface IApp extends AirEntity {
  /**
   * # 应用名称
   */
  appName: string

  /**
   * # 应用编码
   */
  appCode: string

  /**
   * # PC端服务域名
   */
  pcDomain?: string

  /**
   * # PC端图标
   */
  pcIcon?: string

  /**
   * # 移动端服务域名
   */
  mobileDomain?: string

  /**
   * # 移动端图标
   */
  mobileIcon?: string

  /**
   * # 移动端版本ID
   */
  mobileVersionId?: number

  /**
   * # 电视端服务域名
   */
  televisionDomain?: string
  /**
   * # 移动端图标
   */
  televisionIcon?: string

  /**
   * # 移动端版本ID
   */
  televisionVersionId?: number
}
