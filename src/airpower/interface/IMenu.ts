import { ITree } from './ITree'

/**
 * # 标准菜单接口
 * @author Hamm
 */
export interface IMenu extends ITree {
    /**
     * # 菜单路径
     */
    path: string

    /**
     * # 菜单图标
     */
    icon: string

    /**
     * # 是否隐藏
     */
    isHide: boolean

    /**
     * # 组件地址
     */
    component: string
}
