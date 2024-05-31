import { AirEntity } from '../dto/AirEntity'

/**
 * # 标准树结构接口
 * @author SPower
 */
export interface ITree extends AirEntity {
  /**
   * # 名称
   */
  name: string

  /**
   * # 树的子节点
   */
  children: this[]

  /**
   * # 父节点ID
   */
  parentId?: number

  /**
   * 树的父级对象
   */
  parent?: this
}
