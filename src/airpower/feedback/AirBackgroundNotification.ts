/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * # 弹出后台通知(浏览器级别)
 * @author Hamm
 */
export class AirBackgroundNotification {
  private title = '你收到了一条通知'

  private content = ''

  private data: any = null

  private icon = ''

  constructor() {
    if (window.Notification && window.Notification.permission !== 'granted') {
      window.Notification.requestPermission()
    }
  }

  /**
   * # 设置回调数据
   * @param data 回调数据
   */
  setData(data: any) {
    this.data = data
    return this
  }

  /**
   * # 设置显示图片
   * @param icon 显示图片
   */
  setIcon(icon: string) {
    this.icon = icon
    return this
  }

  /**
   * # 弹出后台通知
   * @param title 标题
   * @param content 内容
   */
  static async show(title: string, content?: string): Promise<void> {
    return new AirBackgroundNotification().show(title, content)
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
   * @param content 消息
   * @returns 实例
   */
  setContent(content: string): this {
    this.content = content
    return this
  }

  /**
   * # 弹出后台通知
   * @param title 标题
   * @param content 内容
   */
  async show(title?: string, content?: string): Promise<void> {
    return new Promise((resolve) => {
      const notification = new Notification(title || this.title, {
        body: content || this.content,
        icon: this.icon,
      })
      notification.onclick = () => {
        notification.close()
        resolve(this.data)
      }
    })
  }
}
