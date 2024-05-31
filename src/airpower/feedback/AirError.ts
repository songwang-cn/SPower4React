import { AppConfig } from '@/config/AppConfig'
import { AirHttpStatus } from '../enum/AirHttpStatus'
import { AirNotification } from './AirNotification'

/**
 * # 错误反馈
 * @anthor SPower
 */
export class AirError {
  /**
   * # 错误状态码 默认500
   */
  private code = AirHttpStatus.INTERNAL_SERVER_ERROR

  /**
   * # 错误信息文本
   */
  private message = AppConfig.errorMessage

  /**
   * # 实例一个错误提示框
   * @param error [可选]错误信息
   * 传入catch的Error信息或错误信息字符串或不传
  ```javascript
  // 一、链式调用与传参
  new AirError().setCode(404).setMessage("找不到数据").show();

  // 二、普通实例化调用
  let apiError: AirError = new AirError();
  apiError.setCode(404);
  apiError.setMessage("找不到数据");
  apiError.show();
  ```
   */
  // eslint-disable-next-line
  constructor(error?: any) {
    switch (typeof error) {
      case 'object':
        this.code = error?.code || AirHttpStatus.RUNTIME_ERROR
        this.message = error.msg || ((error as Error).message === 'Network Error' ? '请求失败,请检查你的网络连接' : '系统错误,请查看控制台错误信息')
        break
      case 'string':
        this.message = error
        break
      default:
    }
  }

  /**
   * # 创建实例方法
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  static create(error?: Error | string): AirError {
    return new AirError(error)
  }

  /**
   * # 设置错误码
   * @param code 错误状态码
   * @returns AirError对象
   */
  setCode(code: number): AirError {
    this.code = code
    return this
  }

  /**
   * # 设置错误信息
   * @param message 错误信息
   * @returns AirError对象
   */
  setMessage(message: string): AirError {
    this.message = message
    return this
  }

  /**
   * # 显示错误信息提示
   */
  show(): void {
    new AirNotification().setTitle(`发生错误(${this.code})`)
      .setMessage(this.message)
      .error()
  }

  /**
   *
   * @param message 错误信息
   * @param code [可选]错误代码
   */
  static show(message: string, code?: number): void {
    if (code) {
      return this.create().setCode(code)
        .setMessage(message)
        .show()
    }
    return this.create(message).show()
  }
}
