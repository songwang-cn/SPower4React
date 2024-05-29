/* eslint-disable no-unused-vars */
/**
 * # 常用权限标识枚举
 * @author Hamm
 */
export enum AirPermissionAction {
    /**
     * # 新增
     */
    ADD = 'save',

    /**
     * # 修改
     */
    EDIT = 'update',

    /**
     * # 删除
     */
    DELETE = 'delete',

    /**
     * # 详情
     */
    DETAIL = 'get',

    /**
     * # 添加下级数据
     */
    ADD_CHILD = 'addChild',

    /**
     * # 导出
     */
    EXPORT = 'exportData',

    /**
     * # 导入
     */
    IMPORT = 'importData',
}
