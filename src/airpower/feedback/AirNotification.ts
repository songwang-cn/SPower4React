import { notification } from 'antd'
import { AirFeedbackIcon } from '../enum/AirFeedbackIcon'
import { AppConfig } from '@/config/AppConfig'

/**
 * # 通知基类
 * @author Hamm
 */
export class AirNotification {
  /**
   * # 通知标题
   */
  private title = ''

  /**
   * # 通知内容
   */
  private message = ''

  /**
   * # 通知默认保留时长 单位 s
   */
  private duration = 3

  /**
   * # 顶部偏移量
   */
  private offset = AppConfig.defaultNotificationOffset

  /**
   * # 初始化一个通知
    ```
    //弹出错误信息的方式 code可选 默认500
    new AirNotification().setMessage("我警告你不要搞事情").setTitle("警告的标题").warning();
    new AirNotification().warning("我警告你不要搞事情","警告的标题");
    ```
   */
  constructor() {
    this.title = '系统提示'
    this.message = '你并没有传入具体的错误信息：）'
  }

  /**
   * # 创建实例方法
   */
  static create(): AirNotification {
    return new AirNotification()
  }

  /**
   * # 设置标题
   * @param title 标题
   * @returns 实例
   */
  setTitle(title: string): this {
    this.title = title
    return this
  }

  /**
   * # 设置消息
   * @param message 消息
   * @returns 实例
   */
  setMessage(message: string): this {
    this.message = message
    return this
  }

  /**
   * # 设置自动关闭时间
   * @param duration 自动关闭时间
   * @returns 实例
   */
  setDuration(duration: number): this {
    this.duration = duration
    return this
  }

  /**
   * # 警告通知
   *
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   * @returns 是否点击了通知
   */
  async warning(message?: string, title?: string): Promise<boolean> {
    this.setTitleAndMessage(title, message)
    return this.show(AirFeedbackIcon.WARNING)
  }

  /**
   * # 警告通知
   *
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   * @returns 是否点击了通知
   */
  static async warning(message?: string, title?: string): Promise<boolean> {
    return this.create().warning(message, title)
  }

  /**
   * # 成功通知
   *
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   * @returns 是否点击了通知
   */
  async success(message?: string, title?: string): Promise<boolean> {
    return this.setTitleAndMessage(title, message).show(AirFeedbackIcon.SUCCESS)
  }

  /**
   * # 成功通知
   *
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   * @returns 是否点击了通知
   */
  static async success(message?: string, title?: string): Promise<boolean> {
    return this.create().success(message, title)
  }

  /**
   * # 信息通知
   *
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   * @returns 是否点击了通知
   */
  async info(message?: string, title?: string): Promise<boolean> {
    return this.setTitleAndMessage(title, message).show(AirFeedbackIcon.INFO)
  }

  /**
   * # 信息通知
   *
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   * @returns 是否点击了通知
   */
  static async info(message?: string, title?: string): Promise<boolean> {
    return this.create().info(message, title)
  }

  /**
   * # 错误通知
   *
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   * @returns 是否点击了通知
   */
  async error(message?: string, title?: string): Promise<boolean> {
    return this.setTitleAndMessage(title, message).show(AirFeedbackIcon.ERROR)
  }

  /**
   * # 错误通知
   *
   * 如用户点击了通知 返回true 否则false
   * @param message [可选] 消息
   * @param title [可选] 标题
   * @returns 是否点击了通知
   */
  static async error(message?: string, title?: string): Promise<boolean> {
    return this.create().error(message, title)
  }

  /**
   * # ⛔️设置标题和内容
   * @param title [可选]标题
   * @param message [可选]内容
   */
  private setTitleAndMessage(title?: string, message?: string) {
    if (title) {
      this.setTitle(title)
    }
    if (message) {
      this.setMessage(message)
    }
    return this
  }

  /**
   * # ⛔️ 显示通知 ⛔️
   *
   * 如用户点击了通知 返回true 否则false
   * @param type 可选枚举通知类型
   * @see success()
   * @see warning()
   * @see error()
   * @see info()
   */
  private async show(type: AirFeedbackIcon): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      notification[type]({
        message: this.title,
        duration: this.duration,
        description: this.message,
        placement: this.offset,
      });
    })
  }
}