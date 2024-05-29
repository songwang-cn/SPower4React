import { Expose, Type } from 'class-transformer'
import { FieldName } from '../decorator/CustomName'
import { AirEntity } from './AirEntity'
import { IMenu } from '../interface/IMenu'
import { AirMenuType } from '../enum/AirMenuType'

/**
 * # 内置菜单实体
 * @author Hamm
 */
// eslint-disable-next-line no-use-before-define
export class AirMenuEntity extends AirEntity implements IMenu {
  @Expose() parentId!: number

  @FieldName('菜单名称')
  @Expose() name!: string

  @Type(() => AirMenuEntity)
  @Expose() children!: this[]

  @FieldName('菜单路径')
  @Expose() path!: string

  @FieldName('组件路径')
  @Expose() component!: string

  @FieldName('菜单图标')
  @Expose() icon!: string

  @FieldName('是否隐藏')
  @Expose() isHide!: boolean

  @Expose() menuType!: AirMenuType

  @Expose() permission!: string

  /**
   * # 设置菜单名称
   * @param name 名称
   */
  setName(name: string): this {
    this.name = name
    return this
  }

  /**
   * # 设置菜单路径
   * @param path 路径
   */
  setPath(path: string): this {
    this.path = path
    return this
  }

  /**
   * # 设置菜单图标
   * @param icon 图标
   */
  setIcon(icon: string): this {
    this.icon = icon
    return this
  }

  /**
   * # 设置菜单是否隐藏
   * @param hide [可选]默认true
   */
  setHide(hide = true): this {
    this.isHide = hide
    return this
  }

  setChildren(children: this[]): this {
    this.children = children
    return this
  }
}
