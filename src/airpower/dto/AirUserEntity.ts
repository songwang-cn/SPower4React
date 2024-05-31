import { Expose, Type } from 'class-transformer'
import { FieldName } from '../decorator/CustomName'
import { AirEntity } from './AirEntity'
import { FormField } from '../decorator/FormField'
import { IUser } from '../interface/IUser'
import { AirTrim } from '../enum/AirTrim'
import { AirUserBind } from './AirUserBind'

/**
 * # 内置用户实体类
 * @author SPower
 */
export class AirUserEntity extends AirEntity implements IUser {
  @FieldName('登录账号')
  @FormField({
    trim: AirTrim.ALL,
    placeholder: '请输入登录系统的账号...',
  })
  @Expose() username!: string

  @FieldName('登录密码')
  @FormField({
    isPassword: true,
    placeholder: '请输入登录系统的密码...',
  })
  @Expose() password!: string

  @FieldName('真实姓名')
  @FormField({
    trim: AirTrim.ALL,
    maxLength: 20,
  })
  @Expose() realName!: string

  @FieldName('手机号')
  @FormField({
    maxLength: 11,
    placeholder: '如填写了手机号, 可通过验证码方式登录',
  })
  @Expose() phoneNumber!: string

  @Expose() avatar!: string

  @FieldName('企业代码')
  @FormField({
    placeholder: '请询问管理员获取企业代码...',
  })
  @Expose() tenantCode!: string

  @FieldName('原始密码')
  @FormField({
    isPassword: true,
  })
  @Expose() oldPassword!: string

  @FieldName('新的密码')
  @FormField({
    isPassword: true,
  })
  @Expose() newPassword!: string

  @FieldName('确认密码')
  @FormField({
    isPassword: true,
  })
  @Expose() confirmPassword!: string

  @Expose() createdTime?: number

  /**
   * # 登录验证码
   * ! 传参用
   */
  @FieldName('验证码')
  @FormField()
  @Expose() verificationCode!: string

  /**
   * # 用户绑定信息
   */
  @Type(() => AirUserBind)
  @Expose({ name: 'userBindInfo' }) bindInfo!: AirUserBind
}
