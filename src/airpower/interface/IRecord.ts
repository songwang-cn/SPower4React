import { AirColor } from '../enum/AirColor'

/**
 * # 标准记录集 用于全局固定枚举常量的声明
 * @author SPower
 */
export interface IRecord {
    /**
     * # 常量的值
     */
    key: number | string | boolean,

    /**
     * # 常量的显示标题
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    label: any

    /**
     * # 标准**AirColor**颜色或自定义颜色
     *
     * 🎉 建议使用 ```AirColor``` 标准色(我们也支持十六进制颜色或标准HTML颜色)
     *
     * 如 ```AirColor.SUCCESS``` 或 ```#000000``` 或 ```orangered```
     */
    color?: AirColor | string

    /**
     * # 是否被禁用
     * 如禁用, 下拉选项中将显示但无法选中
     */
    disabled?: boolean

    /**
     * # 子记录集
     */
    children?: IRecord[]
}
