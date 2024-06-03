import { ClassConstructor } from 'class-transformer'
import { AppConfig } from '../AppConfig'
import { AirEntity } from '../dto/AirEntity'
import { AirMenuEntity } from '../dto/AirMenuEntity'
import { AirTenantEntity } from '../dto/AirTenantEntity'
import { AirClassTransformerHelper } from '../helper/AirClassTransformerHelper'
import { AirAbstractService } from './AirAbstractService'
import { AirNotification } from '../feedback/AirNotification'
import { IUser } from '../interface/IUser'
import { AirUserEntity } from '../dto/AirUserEntity'
import { AirCryptoHelper } from '../helper/AirCryptoHelper'
import { AirTenantAppEntity } from '../dto/AirTenantAppEntity'
import { AirMessageEntity } from '../dto/AirMessageEntity'

/**
 * # 公共服务接口类
 * @author Hamm
 */
export class AirCommonService extends AirAbstractService<AirEntity> {
  entityClass = AirEntity

  baseUrl = `${AppConfig.commonApiUrl}common`

  /**
   * # 发送短信验证码
   * @param user 用户实体
   */
  async sendSmsCode(user: AirUserEntity): Promise<void> {
    return this.api('getPhoneVerificationCode').post(user.copy().toJson())
  }

  /**
   * # 获取二维码的扫描结果
   * @param qrcode 二维码的值
   */
  async getQrcodeScanResult(qrcode: string): Promise<string> {
    try {
      return this.api('loginQRCodeInfo', `${AppConfig.commonApiUrl}qrcode`).withOutError().post({ qrcode })
    } catch (e) {
      return ''
    }
  }

  /**
   * # 获取二维码key
   */
  async getQrcode(): Promise<string> {
    return this.api('loginQRCode', `${AppConfig.commonApiUrl}qrcode`).post()
  }

  /**
   * # 获取绑定二维码
   */
  async getBindQrcode(): Promise<Record<string, string>> {
    return this.api('bindQrcode', `${AppConfig.commonApiUrl}wechat`).post()
  }

  /**
   * # 获取绑定二维码扫码状态
   */
  async getBindQrcodeStatus(qrcodeTicket: string): Promise<Record<string, string>> {
    return this.api('checkBindStatus', `${AppConfig.commonApiUrl}wechat`).withOutError().post({ qrcodeTicket })
  }

  /**
   * # 获取微信二维码
   */
  async getWechatLoginQrcode(): Promise<Record<string, string>> {
    return this.api('loginQrcode', `${AppConfig.commonApiUrl}wechat`).post()
  }

  /**
   * # 解绑微信
   */
  async unBindWechat(): Promise<void> {
    await this.api('unbind', `${AppConfig.commonApiUrl}wechat`).post()
  }

  /**
   * # 获取绑定二维码扫码状态
   */
  async getLoginQrcodeStatus(qrcodeTicket: string): Promise<string> {
    return this.api('checkLoginStatus', `${AppConfig.commonApiUrl}wechat`).withOutError().post({ qrcodeTicket })
  }

  /**
   * # 获取当前的租户的信息
   * ---
   * ### 💡 如不传入租户编码 则默认从域名中获取
   * @param tenantCode [可选]租户编码
   */
  async getTenantInfo(tenantCode?: string): Promise<AirTenantEntity> {
    const airHttp = this.api('getTenantInfo').withOutError()
    if (tenantCode) {
      airHttp.addHttpHeader(AppConfig.defaultTenantHeaderKey, tenantCode)
    }
    const json = await airHttp.post()
    return AirTenantEntity.fromJson(json)
  }

  /**
   * # 获取当前应用的信息
   */
  async getTenantAppInfo(): Promise<AirTenantAppEntity> {
    const json = await this.api('getTenantApp').post()
    return AirTenantAppEntity.fromJson(json)
  }

  /**
   * # 获取当前租户有权限的应用列表
   */
  async getCurrentTenantAppList(): Promise<AirTenantAppEntity[]> {
    const jsonArray = await this.api('getTenantAppList').post()
    return AirTenantAppEntity.fromJsonArray(jsonArray)
  }

  /**
   * # 获取当前租户指定应用的所有菜单列表树
   */
  async getTenantAppMenuTreeList(id: number): Promise<AirMenuEntity[]> {
    const jsonArray = await this.api('getTenantAppMenuTreeList').post(new AirEntity(id).toJson())
    return AirMenuEntity.fromJsonArray(jsonArray)
  }

  /**
   * # 通过账号查询用户
   * @param username 用户账号
   * @param withOutError [可选]是否自行处理错误
   */
  async getUserByUsername(username: string, withOutError = false): Promise<AirUserEntity> {
    const user = new AirUserEntity()
    user.username = username
    const airHttp = this.api('findByUsername', `${AppConfig.commonApiUrl}sysUser`)
    if (withOutError) {
      airHttp.withOutError()
    }
    try {
      const json = await airHttp.post(user.toJson())
      return AirUserEntity.fromJson(json)
    } catch (e) {
      throw new Error()
    }
  }

  /**
   * # 通过手机号查询用户
   * @param phoneNumber 用户手机号
   * @param withOutError [可选]是否自行处理错误
   */
  async getUserByPhoneNumber(phoneNumber: string, withOutError = false): Promise<AirUserEntity> {
    const user = new AirUserEntity()
    user.phoneNumber = phoneNumber
    const airHttp = this.api('findByPhoneNumber', `${AppConfig.commonApiUrl}sysUser`)
    if (withOutError) {
      airHttp.withOutError()
    }
    try {
      const json = await airHttp.post(user.toJson())
      return AirUserEntity.fromJson(json)
    } catch (e) {
      throw new Error()
    }
  }

  /**
   * # 修改我的密码
   * @param user 修改的用户信息
   */
  async changePassword(user: AirUserEntity): Promise<void> {
    const userEntity = user.copy()
    userEntity.oldPassword = AirCryptoHelper.aesEncrypt(userEntity.oldPassword)
    userEntity.newPassword = AirCryptoHelper.aesEncrypt(userEntity.newPassword)
    userEntity.expose('oldPassword', 'newPassword')
    return this.api('changePassword').post(userEntity.toJson())
  }

  async updateMyInfo(user: AirUserEntity): Promise<void> {
    return this.api('editProfile').post(user.toJson())
  }

  /**
   * # 用户登录
   */
  async login(user: AirUserEntity): Promise<string> {
    const loginUserEntity = user.copy()
    const airHttp = this.api('login').addHttpHeader(AppConfig.defaultTenantHeaderKey, loginUserEntity.tenantCode)
    loginUserEntity.exclude('tenantCode')
    loginUserEntity.password = AirCryptoHelper.aesEncrypt(loginUserEntity.password)
    return (await airHttp.post(loginUserEntity.toJson())).toString()
  }

  /**
   * # 用户手机号登录
   */
  async phoneLogin(user: AirUserEntity): Promise<string> {
    const loginUserEntity = user.copy()
    const airHttp = this.api('phoneLogin').addHttpHeader(AppConfig.defaultTenantHeaderKey, loginUserEntity.tenantCode)
    loginUserEntity.exclude('tenantCode')
    return (await airHttp.post(loginUserEntity.toJson())).toString()
  }

  /**
   * # 退出登录
   */
  async logout(): Promise<void> {
    return this.api('logout').post()
  }

  /**
   * 获取当前用户的个人信息
   * @param clazz 实体类
   * @returns
   */
  async getCurrentUserInfo<T extends IUser>(clazz: ClassConstructor<T>): Promise<T> {
    try {
      const result = await this.api('getMyInfo').withOutError()
        .post()
      return AirClassTransformerHelper.parse(result, clazz)
    } catch (e) {
      switch ((e as Record<string, unknown>).code) {
        case 401:
          if (AppConfig.router) {
            AppConfig.router.push('/login')
          } else {
            AirNotification.error('请先为AppConfig注入router配置', '无权访问')
          }
          break
        case 403:
          if (AppConfig.router) {
            AppConfig.router.push('/403')
          } else {
            AirNotification.error('请先为AppConfig注入router配置', '无权访问')
          }
          break
        case 404:
          if (AppConfig.router) {
            AppConfig.router.push('/')
          } else {
            AirNotification.error('请先为AppConfig注入router配置', '无权访问')
          }
          break
        default:
          if (AppConfig.router) {
            AppConfig.router.push('/500')
          } else {
            AirNotification.error('请先为AppConfig注入router配置', '无权访问')
          }
      }
      throw new Error()
    }
  }

  /**
   * 获取菜单列表
   * @returns
   */
  async getMenuTreeList(): Promise<AirMenuEntity[]> {
    const result = await this.api('getMenuTreeList').post()
    return AirClassTransformerHelper.parseArray(result, AirMenuEntity)
  }

  /**
   * # 获取当前用户的权限列表
   * @returns
   */
  async getMyPermissionList(): Promise<string[]> {
    return this.api('getMyPermissionList').post()
  }

  /**
   * # 查询消息
   * @param entity 最后一条消息
   */
  async getMessageList(entity = new AirMessageEntity()): Promise<AirMessageEntity[]> {
    const jsonArray = await this.api('recentMessage', `${AppConfig.commonApiUrl}sysUserMessage`).post(entity.copy().expose('messageId', 'isRead'))
    return AirMessageEntity.fromJsonArray(jsonArray)
  }

  /**
   * # 标记消息已读
   * @param entity 消息实体
   */
  async setMessageIsReaded(entity: AirMessageEntity): Promise<number> {
    return this.api('read', `${AppConfig.commonApiUrl}sysUserMessage`).post(entity.copy().expose('messageId'))
  }

  /**
   * # 标记消息全部已读
   */
  async setMessageAllReaded(): Promise<void> {
    return this.api('readAll', `${AppConfig.commonApiUrl}sysUserMessage`).post()
  }
}
