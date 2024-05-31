import { AirDateTimeFormatter } from '@/airpower/enum/AirDateTimeFormatter'
import { AirHttpStatus } from '@/airpower/enum/AirHttpStatus'
import { INormalTreeProps } from '@/airpower/interface/INormalTreeProps'
import { AppStore } from '@/store'
import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];

import defaultLogo from '@/assets/img/logo.png'

/**
 * # 😄APP全局配置
 * @author SPower
 */
export class AppConfig {
    /**
     * # 当前版本号
     */
    static readonly version = 'v5.0.0-alpha1'

    /**
     * # 应用描述
     */
    static appDescription = ''

    /**
     * # 当前应用的名称
     */
    static appName = 'AirPower4React'

    /**
     * # 当前应用的Logo
     */
    static appLogo = defaultLogo

    /**
     * # 登录地址路径
     */
    static loginPath = '/login'

    /**
     * # 控制台路径
     */
    static consolePath = '/console'

    /**
     * # ESC是否可关闭掉所有的弹窗
     */
    static escToCloseAllDialog = true

    /**
     * # 😠超时时间 毫秒
     */
    static timeout = 5000

    /**
     * # 当前应用appId(后端提供)
     */
    static appId = ''

    /**
     * # 单点登录启用状态
     */
    private static ssoStatus = false


    /**
     * 弹出形式的组件是否支持点击背景关闭
     */
    static isCloseByCover = true

    /**
     * # 单点登录是否启用
     */
    static get ssoEnabled() {
        return AppConfig.ssoStatus
    }

    /**
     * # 单点登录是否启用
     */
    static set ssoEnabled(value) {
        AppConfig.ssoStatus = value
        if (!value) {
            // 没有开启单点登录 公共服务地址将使用当前项目的api地址
            AppConfig.commonApiUrl = AppConfig.apiUrl
            AppConfig.commonUrl = '/'
        }
    }

    /**
     * # Vue 路由
     */
    static router: any

    /**
     * # 公共服务访问地址 💡 环境变量请包含协议头
     */
    static commonUrl = import.meta.env.VITE_APP_COMMON_URL || 'https://www.holdhopecloud.com/'

    /**
     * # 是否将租户作为子域，否则拼借接在url参数上
     */
    static useDomain = false

    /**
     * # 项目API地址
     */
    static apiUrl = import.meta.env.VITE_APP_API_URL || '/api/'

    /**
     * # 静态资源访问地址 💡 环境变量请包含协议头
     */
    static staticUrl = import.meta.env.VITE_APP_STATIC_URL || 'https://static.holdhopecloud.com/'

    /**
     * # 公共服务API地址 💡 环境变量请包含协议头
     */
    static commonApiUrl = import.meta.env.VITE_APP_COMMON_API_URL || 'https://sso.holdhopecloud.com/'

    /**
     * # 标准错误提示标题
     */
    static errorTitle = '发生错误'

    /**
     * # 标准错误提示内容
     */
    static errorMessage = '系统发生了一些错误，请稍候再试 :)'

    /**
     * # AccessToken在LocalStorage存储的key
     */
    static accessTokenKey = 'access_token'

    /**
     * # 最近访问的路径
     */
    static lastPathKey = 'air_last_path'

    /**
     * # 默认树结构配置数据
     */
    static defaultTreeProps: INormalTreeProps = {
        children: 'children',
        label: 'name',
    }

    /**
     *  # 默认数字精度 0为整数
     */
    static defaultPrecision = 0

    /**
     *  # 最大数字
     */
    static maxNumber = 999999999999999

    /**
     *  # 最小数字
     */
    static minNumber = 0

    /**
     *  # 文本域最大长度
     */
    static maxTextAreaLength = 255

    /**
     *  # 文本最大长度
     */
    static maxTextLength = 50

    /**
     * # 是否访问超时
     */
    static isTimeout = false

    /**
     * # 文本域的最小行数
     */
    static defaultTextareaMinRows = 3

    /**
     * # 文本域的最大行数
     */
    static defaultTextareaMaxRows = 6

    /**
     * # 全局http请求返回code的key
     * 默认 "code"
     */
    static defaultHttpGlobalCodeKey = 'code'

    /**
     * # 全局http请求返回message的key
     * 默认 "message"
     */
    static defaultHttpGlobalMessageKey = 'message'

    /**
     * # 全局http请求返回data的key
     * 默认 "data"
     */
    static defaultHttpGlobalDataKey = 'data'

    /**
     * # 全局http请求返回成功状态码
     * 默认 200
     */
    static defaultHttpSuccessCode = AirHttpStatus.OK

    /**
     * # 全局http请求返回登录状态码
     * 默认 401
     * @see AirHttpStatus
     */
    static defaultHttpUnauthorizedCode = AirHttpStatus.UNAUTHORIZED

    /**
     * # 默认的格式化时间
     * 如设置,则未格式化方式的地方将默认使用此方式
     * ```
     * AppConfig.defaultDateTimeFormatter = AirDateTimeFormatter.YYYY_MM_DD
     * @see AirDateTimeFormatter
     * ```
     */
    static defaultDateTimeFormatter = AirDateTimeFormatter.YYYY_MM_DD_HH_mm_ss

    /**
     * # 权限列表
     */
    static permissionList: string[] = []

    /**
     * # 弹窗是否默认显示全屏按钮(默认true)
     * 此项仅为默认, 如手动传入, 此项将无效
     */
    static defaultDialogFullable = true

    /**
     * # 弹窗是否默认隐藏取消按钮(默认true)
     * 此项仅为默认, 如手动传入, 此项将无效
     */
    static defaultDialogHideCancel = true

    /**
     * # 普通文本输入是否默认显示长度限制标签(默认false)
     * 此项仅为默认, 如在装饰器中配置, 此项将无效
     */
    static defaultInputShowLimit = false

    /**
     * # TextArea是否默认显示长度限制标签(默认true)
     * 此项仅为默认, 如在装饰器中配置, 此项将无效
     */
    static defaultTextAreaShowLimit = true

    /**
     * # 普通关键词搜索的提示文本
     * 此项仅为默认, 如手动传入, 此项将无效
     */
    static defaultKeywordSearchPlaceholder = '请输入关键词搜索...'

    /**
     * # 分页组件默认使用的页码列表
     * 此项仅为默认, 如手动传入, 此项将无效
     */
    static defaultPageSizes = [20, 50, 100]

    /**
     * # 默认的表格空数据兜底字符串
     * \@TableField 装饰器中可以单独配置 ```emptyValue```,
     */
    static defaultTableEmptyValue = '--'

    /**
     * # 默认的表格数组显示分割字符
     * \@TableField 装饰器中可以单独配置 ```arraySplitor```,
     */
    static defaultArraySplitor = '，'

    /**
     * # 默认的文件上传地址
     */
    static defaultUploadUrl = `${AppConfig.commonApiUrl}sysTenantFiles/upload`

    /**
     * # 默认的身份验证header头名称
     */
    static defaultAccessHeaderKey = 'Authorization'

    /**
     * # 默认的租户编码header头名称
     */
    static defaultTenantHeaderKey = 'Tenant-Code'

    /**
     * # 默认应用编码header头名称
     */
    static defaultAppHeaderKey = 'App-Code'

    /**
     * # 是否显示请求成功具体消息
     */
    static showHttpSuccessMsg = false

    /**
     * # 设置上次访问的路径
     * @param path
     */
    static setLastPath(path: string): void {
        localStorage.setItem(this.lastPathKey, path)
    }

    /**
     * # 获取上次访问的路径
     */
    static getLastPath(): string {
        return localStorage.getItem(this.lastPathKey) || ''
    }

    /**
     * # 获取AccessToken
     */
    static getAccessToken(): string {
        return localStorage.getItem(this.accessTokenKey) || ''
    }

    /**
     * # 存储AccessToken
     * @param accessToken AccessToken
     */
    static saveAccessToken(accessToken: string): void {
        localStorage.setItem(this.accessTokenKey, accessToken)
        if (this.ssoEnabled) {
            AppStore.updateAccessToken(accessToken)
        }
    }

    /**
     * # 移除本地存储的AccessToken
     */
    static removeAccessToken(): void {
        localStorage.removeItem(this.accessTokenKey)
        if (this.ssoEnabled) {
            AppStore.updateAccessToken('')
        }
    }

    /**
     * # 重定向到登录页面
     */
    static redirectToLogin() {
        // eslint-disable-next-line no-restricted-globals
        if (this.router.currentRoute.value.path !== this.loginPath) { location.replace(this.loginPath) }
        this.removeAccessToken()
    }

    /**
     * # 是否有权限
     * @param permission 权限标识
     */
    static hasPermission(permission: string): boolean {
        return this.permissionList.includes(permission)
    }

    /**
     * # 是否自动处理常用权限
     *
     * 如此项配置为 ```false``` , 则 ```EntityConfig``` 中的 ```permissionPrefix``` 将自动失效
     *
     * 若此时 ```EntityConfig``` 没有配置其他的权限标识, 则认为不校验权限
     */
    static autoPermission = true

    /**
     * # 是否禁用消息系统
     * 如禁用 右上角将不显示消息服务
     */
    static disableMessage = false

    /**
     * # 默认的Notification偏移顶部的距离
     */
    static defaultNotificationOffset: NotificationPlacement = 'topRight'

    /**
     * # 从Host中获取租户编码（取不到则从url取）
     */
    static getTenantCodeFromHost() {
        const tenantCode = ''
        if (!this.ssoEnabled) {
            return tenantCode
        }
        if (!import.meta.env.VITE_APP_SSO_DOMAIN) {
            return tenantCode
        }
        // eslint-disable-next-line no-restricted-globals
        const { host } = location

        if (host.indexOf(`.${import.meta.env.VITE_APP_SSO_DOMAIN}`) < 0) {
            return tenantCode || this.getTenantCodeFromUrl()
        }
        return host.replaceAll(`.${import.meta.env.VITE_APP_SSO_DOMAIN}`, '')
    }

    /**
     * # 从Url中获取租户编码
     */
    static getTenantCodeFromUrl(): string {
        let tenantCode = ''
        if (!this.ssoEnabled) {
            return tenantCode
        }
        if (!import.meta.env.VITE_APP_SSO_DOMAIN) {
            return tenantCode
        }

        // eslint-disable-next-line no-restricted-globals
        const { search } = location
        const searchParams = search.split('?')
        if (searchParams.length > 1) {
            const params = searchParams[1].split('&')
            const tenantIndex = params.findIndex((item) => item.includes('tenantCode'))
            if (tenantIndex > -1) {
                tenantCode = params[tenantIndex].split('=')[1] || ''
                localStorage.setItem('tenantCode', tenantCode)
            }
        }

        return tenantCode || localStorage.getItem('tenantCode') || ''
    }

    /**
     * # 清除租户编码
     */
    static removeTenantCode() {
        localStorage.removeItem('tenantCode')
    }

    /**
     * 更新租户编码
     * @param tenantCode
     */
    static saveTenantCode(tenantCode: string) {
        localStorage.setItem('tenantCode', tenantCode)
    }

    /**
     * # 获取带租户编码的跳转地址
     * @param code 租户编码
     */
    static getUrlByTenantCode(code: string): string {
        return `//${code}.${import.meta.env.VITE_APP_SSO_DOMAIN}${AppConfig.getLastPath() || '/'}`
    }

    static readonly httpScheme = 'http://'

    static readonly httpsScheme = 'https://'

    /**
     * # 获取指定URL的协议
     * @param url URL
     */
    static getUrlScheme(url: string): string {
        if (url.indexOf(this.httpsScheme) > -1) {
            return this.httpsScheme
        }
        if (url.indexOf(this.httpScheme) > -1) {
            return this.httpScheme
        }
        return ''
    }

    /**
     * # 获取指定URL不包含协议头的部分
     * @param url URL
     */
    static getUrlWithoutScheme(url: string): string {
        return url.replace(this.httpScheme, '').replace(this.httpsScheme, '')
    }
}
