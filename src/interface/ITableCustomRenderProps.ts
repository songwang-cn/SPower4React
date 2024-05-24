
/**
 * 表格在使用 自定义字段 作为 插槽名称 时，防止 TS 校验报红, 在这里加上你需要使用的字段即可
 */
export interface ITableCustomRenderProps<T> {
    tags?: T
    address?: T
}
