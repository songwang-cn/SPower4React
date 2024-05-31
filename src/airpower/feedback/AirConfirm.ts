import { Modal } from 'antd'
import { AirFeedbackType } from '../enum/AirFeedbackType'
import { AirAlert } from './AirAlert'
import { ReactNode } from 'react'

/**
 * #  确认弹窗类
 * @author SPower
 */
export class AirConfirm extends AirAlert {
  /**
   * # 弹出确认框
   */
  constructor() {
    super()
    this.title = '请你确认'
    this.content = '是否确认继续操作？'
    this.confirmText = '确认'
    this.cancelText = '取消'
  }

  /**
   * # 创建实例方法
   */
  static create(): AirConfirm {
    return new AirConfirm()
  }

  /**
   * # 设置取消按钮文字
   * @param cancelText 取消按钮文字
   */
  setCancelText(cancelText: string): this {
    this.cancelText = cancelText
    return this
  }

  /**
   * # 启用ESC关闭
   */
  enableEscClose(): this {
    this.isCloseByEscape = true
    return this
  }

  /**
   * # 启用遮罩层关闭
   */
  enableCoverClose(): this {
    this.isCloseByCover = true
    return this
  }

  /**
   * # 显示成功图标的确认框
   * @param content [可选] 消息内容
   * @param title [可选] 消息标题
   */
  success(content?: string, title?: string): Promise<void> {
    this.alertType = 'success'
    return this.show(content, title)
  }

  /**
   * # 显示成功图标的确认框
   * @param content [可选] 消息内容
   * @param title [可选] 消息标题
   */
  static success(content?: string, title?: string): Promise<void> {
    return this.create().success(content, title)
  }

  /**
   * # 显示警告图标的确认框
   * @param content [可选] 消息内容
   * @param title [可选] 消息标题
   */
  warning(content?: string, title?: string): Promise<void> {
    this.alertType = AirFeedbackType.WARNING
    return this.show(content, title)
  }

  /**
   * # 显示警告图标的确认框
   * @param content [可选] 消息内容
   * @param title [可选] 消息标题
   */
  static warning(content?: string, title?: string): Promise<void> {
    return this.create().warning(content, title)
  }

  /**
   * # 显示错误图标的确认框
   * @param content [可选] 消息内容
   * @param title [可选] 消息标题
   */
  error(content?: string, title?: string): Promise<void> {
    this.alertType = AirFeedbackType.ERROR
    return this.show(content, title)
  }

  /**
   * # 显示错误图标的确认框
   * @param content [可选] 消息内容
   * @param title [可选] 消息标题
   */
  static error(content?: string, title?: string): Promise<void> {
    return this.create().error(content, title)
  }

  /**
   * # 显示消息图标的确认框
   * @param content [可选] 消息内容
   * @param title [可选] 消息标题
   */
  info(content?: string, title?: string): Promise<void> {
    this.alertType = AirFeedbackType.INFO
    return this.show(content, title)
  }

  /**
   * # 显示消息图标的确认框
   * @param content [可选] 消息内容
   * @param title [可选] 消息标题
   */
  static info(content?: string, title?: string): Promise<void> {
    return this.create().info(content, title)
  }

  /**
   * # 显示无图标确认弹窗
   * 带图标请直接 ```.success()``` ```.warning()``` ```.error()```
   * @param content [可选] 消息内容
   * @param title [可选] 消息标题
   */
  show(content?: string | ReactNode, title?: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Modal.confirm({
        content: content || this.content,
        title: title || this.title,
        icon: null,
        ...this.getConfig(),
        onOk: () => resolve(),
        onCancel: () => reject()
      })
    })
  }

  /**
   * # 显示无图标确认弹窗
   * 带图标请直接 ```.success()``` ```.warning()``` ```.error()```
   * @param content [可选] 消息内容
   * @param title [可选] 消息标题
   */
  static show(content?: string | ReactNode, title?: string): Promise<void> {
    return this.create().show(content, title)
  }
}
