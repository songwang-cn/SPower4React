/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClassConstructor, plainToInstance, TargetMap } from 'class-transformer'
import { IRecord } from '../interface/IRecord'
import { ITree } from '../interface/ITree'
import { AirModel } from '../model/AirModel'

/**
 * # 转换类型助手
 * @author SPower
 */
export class AirClassTransformerHelper {
  /**
   * # 强制转换数据到指定的类型
   *
   * @param from 来源JSON对象
   * @param to 目标类
   * @param targetMaps 挂载的子类转换配置  如传入 则无需标记 \@Type
   */
  static parse<T extends AirModel>(from: Record<string, any>, to: ClassConstructor<T>, ...targetMaps: TargetMap[]): T {
    return this.toModel<T>(from, to, targetMaps)
  }

  /**
   * # 强制转换数据到指定的类型数组
   *
   * @param from 来源JSON对象数组
   * @param to 目标类
   * @param targetMaps 挂载的子类转换配置  如传入 则无需标记 \@Type
   */
  static parseArray<T extends AirModel>(from: Record<string, any>, to: ClassConstructor<T>, ...targetMaps: TargetMap[]): T[] {
    return this.toModel<T>(from, to, targetMaps) as unknown as T[]
  }

  /**
   * # 强制转换数据到指定的类型
   *
   * @param from 来源JSON对象
   * @param to 目标类
   * @param targetMaps 挂载的子类转换配置  如传入 则无需标记 \@Type
   * @returns 目标类对象实例
   */
  private static toModel<T>(from: Record<string, any>, to: ClassConstructor<T>, targetMaps: TargetMap[] = []): T {
    return plainToInstance(to, from, {
      // Expose/Exclude策略转换
      excludeExtraneousValues: true,
      // 自动隐式类型转换 貌似没什么用
      enableImplicitConversion: true,
      // 输出未匹配且含有默认值的字段
      // exposeDefaultValues: true,
      // 输出undefined的字段
      exposeUnsetFields: true,
      // 关联对象自动转换
      enableCircularCheck: true,
      targetMaps,
    })
  }

  /**
   * # 初始化一个指定类型的实例
   *
   * @param to 目标类
   * @returns 目标类对象实例
   */
  static newInstance<T>(to: ClassConstructor<T>): T {
    return this.toModel({}, to)
  }

  /**
   * # 复制一个实例
   * @param from 来源类对象实例
   * @param to 目标类
   * @returns 目标类对象实例
   */
  static copy<F extends AirModel, T extends AirModel>(from: F, to: ClassConstructor<T>): T {
    return this.parse(from.toJson(), to)
  }

  /**
   * # ITree转换到IRecord
   * @param tree 树
   * @returns 标准数据集
   */
  static tree2Record(tree: ITree): IRecord {
    let children: IRecord[] = []
    if (tree.children && tree.children.length > 0) {
      children = this.treeList2RecordList(tree.children)
    }
    return {
      key: tree.id,
      label: tree.name,
      children,
    } as IRecord
  }

  /**
   * # ITree数组转换到IRecord数组
   * @param treeList
   * @returns
   */
  static treeList2RecordList(treeList: ITree[]): IRecord[] {
    const records: IRecord[] = []
    for (let i = 0; i < treeList.length; i += 1) {
      records.push(this.tree2Record(treeList[i]))
    }
    return records
  }
}
