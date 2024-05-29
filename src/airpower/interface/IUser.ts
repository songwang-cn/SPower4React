import { AirEntity } from '../dto/AirEntity'

/**
 * # 标准用户接口
 * @author Hamm
 */
export interface IUser extends AirEntity {
    /**
     * # 登录账号
     */
    username: string

    /**
     * # 登录密码
     */
    password: string

    /**
     * # 真实姓名
     */
    realName: string

    /**
     * # 头像
     */
    avatar: string

    /**
     * # 手机号
     */
    phoneNumber: string
}
