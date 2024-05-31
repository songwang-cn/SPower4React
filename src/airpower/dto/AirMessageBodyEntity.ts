import { Expose } from 'class-transformer'
import { AirEntity } from './AirEntity'

/**
 * # 消息体
 * @author SPower
 */
export class AirMessageBodyEntity extends AirEntity {
    /**
     * # 消息标题
     */
    @Expose() title!: string

    /**
     * # 消息内容
     */
    @Expose() content!: string

    /**
     * # 消息体
     */
    @Expose() payload!: string

    /**
     * # 跳转的URL
     */
    @Expose() url!: string

    @Expose() createdTime!: string
}
