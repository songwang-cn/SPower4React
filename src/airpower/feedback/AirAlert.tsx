/* eslint-disable no-unused-vars */
import { Modal } from 'antd'
import { ReactNode } from 'react'
import { AppConfig } from '@/config/AppConfig'
/**
 * # 消息弹窗类
 * @author SPower
 */
export class AirAlert {
  /**
   * # 标题
   */
  protected title = '温馨提示'

  /**
   * # 内容
   */
  protected content = '操作成功'

  /**
   * # 确认按钮文字
   */
  protected confirmText = '确定'


  /**
   * # 取消按钮文字
   */
  protected cancelText!: string

  /**
   * # Modal 支持的静态方法
   */
  protected alertType: 'success' | 'warning' | 'error' | 'info' | 'confirm' = 'confirm'


  /**
   * # 是否遮罩层可关闭
   */
  protected isCloseByCover = AppConfig.isCloseByCover

  /**
   * # 弹窗宽度
   */
  protected width = ''

  /**
   * # 弹窗高度
   */
  protected height = ''

  /**
   * # 创建实例方法
   */
  static create(): AirAlert {
    return new AirAlert()
  }

  /**
   * # 设置消息标题
   * @param title 标题
   */
  setTitle(title: string): this {
    this.title = title
    return this
  }

  /**
   * # 设置消息消息内容
   * @param content [可选]内容
   */
  setContent(content: string): this {
    this.content = content
    return this
  }

  /**
   * # 设置确认按钮文字
   * @param confirmText 确认按钮文字
   */
  setOkText(confirmText: string): this {
    this.confirmText = confirmText
    return this
  }

  /**
   * # 设置确认按钮文字
   * @param confirmText 确认按钮文字
   */
  setCancelText(cancelText: string): this {
    this.cancelText = cancelText
    return this
  }

  /**
   * # 设置弹窗宽度
   * @param width 宽度
   * @param isPercent [可选] 是否百分比 默认false
   */
  setWidth(width: number, isPercent = false): this {
    if (isPercent) {
      this.width = `${width}%`
    } else {
      this.width = `${width}px`
    }
    return this
  }

  /**
   * # 设置弹窗高度
   * @param height 高度
   * @param isPercent [可选] 是否百分比 默认false
   */
  setHeight(height: number, isPercent = false): this {
    if (isPercent) {
      this.height = `${height}%`
    } else {
      this.height = `${height}px`
    }
    return this
  }

  /**
   * # 显示成功消息提醒
   * @param content [可选] 消息内容
   * @param title [可选]消息标题
   */
  success(content?: string | ReactNode, title?: string): Promise<void> {
    this.alertType = 'success'
    return this.alert(content, title)
  }

  /**
   * # 显示成功消息提醒
   * @param content [可选] 消息内容
   * @param title [可选]消息标题
   */
  static success(content?: string | ReactNode, title?: string): Promise<void> {
    return this.create().success(content, title)
  }

  /**
   * # 显示警告消息提醒
   * @param content [可选] 消息内容
   * @param title [可选]消息标题
   */
  warning(content?: string | ReactNode, title?: string): Promise<void> {
    this.alertType = 'warning'
    return this.alert(content, title)
  }

  /**
   * # 显示警告消息提醒
   * @param content [可选] 消息内容
   * @param title [可选]消息标题
   */
  static warning(content?: string | ReactNode, title?: string): Promise<void> {
    return this.create().warning(content, title)
  }

  /**
   * # 显示无图标的消息提醒
   * @param content [可选] 消息内容
   * @param title [可选]消息标题
   */
  show(content?: string | ReactNode, title?: string): Promise<void> {
    this.alertType = 'confirm'
    return this.alert(content, title)
  }

  /**
   * # 显示无图标的消息提醒
   * @param content [可选] 消息内容
   * @param title [可选]消息标题
   */
  static show(content?: string | ReactNode, title?: string): Promise<void> {
    return this.create().show(content, title)
  }

  /**
   * # 显示错误消息提醒
   * @param content [可选] 消息内容
   * @param title [可选]消息标题
   */
  error(content?: string | ReactNode, title?: string): Promise<void> {
    this.alertType = 'error'
    return this.alert(content, title)
  }

  /**
   * # 显示错误消息提醒
   * @param content [可选] 消息内容
   * @param title [可选]消息标题
   */
  static error(content?: string | ReactNode, title?: string): Promise<void> {
    return this.create().error(content, title)
  }

  /**
   * # 显示信息类消息提醒
   * @param content [可选] 消息内容
   * @param title [可选]消息标题
   */
  info(content?: string | ReactNode, title?: string): Promise<void> {
    this.alertType = 'info'
    return this.alert(content, title)
  }

  /**
   * # 显示信息类消息提醒
   * @param content [可选] 消息内容
   * @param title [可选]消息标题
   */
  static info(content?: string | ReactNode, title?: string): Promise<void> {
    return this.create().info(content, title)
  }

  /**
   * # 弹出消息框
   * @param content [可选]消息内容
   * @param title [可选]消息标题
   */
  private alert(content?: string | ReactNode, title?: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      Modal[this.alertType]({
        title: title || this.title,    // 标题
        content: content || this.content,  //内容，支持ReactNode
        onOk: () => resolve(),
        onCancel: () => reject(),
        ...this.getConfig(),
      })
    })
  }

  /**
   * 获取其他配置项
   */

  protected getConfig() {
    return {
      centered: true,  //居中显示
      width: this.width,
      height: this.height,
      okText: this.confirmText,
      cancelText: this.cancelText,
      maskClosable: this.isCloseByCover,  //点击遮罩关闭
      keyboard: false,     //esc关闭
    }
  }

}
