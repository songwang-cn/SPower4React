/* eslint-disable @typescript-eslint/no-explicit-any */

import { IRecord } from '@/airpower/interface/IRecord'
import { AirColor } from '../enum/AirColor'
import { AirRecord } from './AirRecord'

/**
 * # 字典数组
 * @author SPower
 */
export class AirRecordArray<R extends IRecord> extends Array<R> {
  /**
   * # 获取字典指定Key的Label
   * @param key Key
   * @param defaultLabel 默认Label
   */
  getLabel(key: boolean | number | string, defaultLabel = '-'): string {
    return this.get(key).label || defaultLabel
  }

  /**
   * # 获取字典指定Key的Color
   * @param key Key
   * @param defaultColor 默认Color
   */
  getColor(key: boolean | number | string, defaultColor: AirColor | string = AirColor.NORMAL): AirColor | string {
    return this.get(key).color || defaultColor
  }

  /**
   * # 获取一个字典选项
   * ---
   * ### 💡 可能返回一个空字典 但你可以放心的点属性
   * @param key Key
   */
  get(key: boolean | number | string): R {
    return this.findByKey(key) as R || {}
  }

  /**
   * # 查找一个字典选项 可能找不到
   * ---
   * ### 💡 可以尝试 ```.get()``` 后放心大胆的点属性
   * @param key Key
   */
  findByKey(key: boolean | number | string): R | undefined {
    return this.find((item) => item.key === key)
  }

  /**
   * # 创建可扩展的字典
   * @param list 字典数组
   */
  static createCustom<R extends IRecord>(list: R[]): AirRecordArray<R> {
    const dictionary = new AirRecordArray<R>()
    list.forEach((json: R) => {
      const item = { ...new AirRecord(), ...json }
      dictionary.push(item)
    })
    return dictionary
  }

  /**
   * # 创建字典
   * @param list 字典数组
   */
  static create(list: IRecord[]): AirRecordArray<IRecord> {
    return this.createCustom(list)
  }
}
