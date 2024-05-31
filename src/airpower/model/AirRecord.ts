import { IRecord } from '../interface/IRecord'
import { AirColor } from '../enum/AirColor'

/**
 * # 标准记录集实现类
 * @author SPower
 */
export class AirRecord implements IRecord {
  key!: number | string | boolean

  label!: unknown

  /**
   * # 标准**AirColor**颜色或自定义颜色
   * 🎉建议使用```AirColor```标准色(我们也支持十六进制颜色或标准HTML颜色)
   *
   * ### 如 ```AirColor.SUCCESS``` 或 ```#000000``` 或 ```orangered```
   */
  color?: AirColor | string

  /**
   * # 是否被禁用
   */
  disabled?: boolean = false

  /**
   * # 子集数据
   */
  // eslint-disable-next-line no-use-before-define
  children?: AirRecord[]

  /**
   * # 实例化一个标准数据集
   * @param key Key
   * @param label Label
   */
  constructor(key?: number | string | boolean, label?: unknown) {
    if (key) {
      this.key = key
    }
    if (label) {
      this.label = label
    }
  }

  /**
   * #  设置常量值
   * @param key 常量值
   * @returns
   */
  setKey(key: string | number | boolean): this {
    this.key = key
    return this
  }

  /**
    * #  设置常量描述
    * @param label 常量的描述
    * @returns
    */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  setLabel(label: unknown): this {
    this.label = label
    return this
  }

  /**
   * #  设置枚举值是否被禁用
   * @param disabled [可选]是否禁用
   * @returns
   */
  setDisabled(disabled = true): this {
    this.disabled = disabled
    return this
  }

  /**
   * #  设置子集
   * @param children 子集
   * @returns
   */
  setChildren(children: AirRecord[]): this {
    this.children = children
    return this
  }
}
