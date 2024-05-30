/* eslint-disable no-unused-vars */
import { Modal } from 'antd'
import { AirFeedbackIcon } from '../enum/AirFeedbackIcon'
import { ReactNode } from 'react'


/**
 * # 消息弹窗类
 * @author Hamm
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
   * # 可选的确认图标类型
   */
  protected icon = AirFeedbackIcon.NONE

  /**
   * # 是否启用HTML富文本
   */
  protected isHtmlEnabled = false

  /**
   * # 是否显示确认按钮
   */
  protected isConfirmButtonShow = true

  /**
   * # 是否显示右上角关闭按钮
   */
  protected isCloseButtonShow = true

  /**
   * # 是否esc可关闭
   */
  protected isCloseByEscape = false

  /**
   * # 是否遮罩层可关闭
   */
  protected isCloseByCover = false

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
  setConfirmText(confirmText: string): this {
    this.confirmText = confirmText
    return this
  }

  /**
   * # 允许使用不安全的HTML富文本
   */
  enableHtml(): this {
    this.isHtmlEnabled = true
    return this
  }

  /**
   * # 是否隐藏确认按钮
   */
  hideConfirm(): this {
    this.isConfirmButtonShow = false
    return this
  }

  /**
   * # 是否隐藏关闭按钮
   */
  hideClose(): this {
    this.isCloseButtonShow = false
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
    this.icon = AirFeedbackIcon.SUCCESS
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
    this.icon = AirFeedbackIcon.WARNING
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
    return new Promise<void>((resolve, reject) => {
      Modal.confirm({
        type: 'confirm',
        title,
        content,
        maskClosable: true,
        centered: true,
        onOk: () => resolve(),
        onCancel: () => reject(),
      })
    })
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
    this.icon = AirFeedbackIcon.ERROR
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
    this.icon = AirFeedbackIcon.INFO
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
      Modal[this.icon]({
        title,
        content,
        maskClosable: true,
        centered: true,
        onOk: () => resolve(),
        onCancel: () => reject(),
      })
    })
  }

  /**
   * # 获取配置
   */
  protected getConfig(): ElMessageBoxOptions {
    const customStyle: CSSProperties = {}
    if (this.width) {
      customStyle.width = this.width
    }
    if (this.height) {
      customStyle.height = this.height
    }
    return {
      showConfirmButton: this.isConfirmButtonShow,
      confirmButtonText: this.confirmText,
      cancelButtonText: this.cancelText,
      type: this.icon,
      draggable: true,
      dangerouslyUseHTMLString: this.isHtmlEnabled,
      customClass: this.isHtmlEnabled ? 'rich-text' : '',
      customStyle,
      showClose: this.isCloseButtonShow,
      closeOnClickModal: this.isCloseByCover,
      closeOnPressEscape: this.isCloseByEscape,
    }
  }
}
