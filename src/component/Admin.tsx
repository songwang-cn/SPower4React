import { DialogHelper } from '@/airpower/helper/DialogHelper'
import Body from './Body'
import { RouterHelper } from '@/airpower/helper/RouterHelper'
import { IRouter } from '@/airpower/interface/IRouter'
import { AppConfig } from '@/config/AppConfig'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'
import ThemeEdit from './ThemeEdit'
import { ConfigProvider } from 'antd'
import { useTheme } from '@/hook/useTheme'
import zhCN from 'antd/locale/zh_CN'
import { useState } from 'react'

const menuList: IRouter[] = [
  {
    name: '首页',
    path: '/',
    icon: 'icon-xiangqing',
    component: '/home/index',
  },
  {
    name: '组件',
    icon: 'icon-xiangqing',
    children: [
      {
        name: '列表（设备）',
        path: '/list',
        icon: 'icon-xiangqing',
        component: '/device/list',
      },
    ],
  },
]
const Admin = () => {
  /**
   * 将 react 路由跳转钩子方法 useNavigate() 赋值给全局配置 AppConfig.navigate
   */
  AppConfig.navigate = useNavigate()

  AppConfig.location = useLocation()

  const [theme, changeTheme] = useState()

  function AdminRouterView() {
    return useRoutes(RouterHelper.initRoute(menuList))
  }

  const onEditTheme = async () => {
    const themeForm = (await DialogHelper.show(<ThemeEdit />)) as any
    document.documentElement.style.setProperty(
      '--color-primary',
      themeForm.colorPrimary,
    )
    document.documentElement.style.setProperty(
      '--border-radius',
      themeForm.borderRadius + 'px',
    )
    changeTheme(themeForm)
    console.log(theme)
    localStorage.setItem('theme', JSON.stringify(themeForm))
  }

  function initCssProperty() {
    if (localStorage.getItem('theme')) {
      const themeConfig = JSON.parse(localStorage.getItem('theme') as string)
      document.documentElement.style.setProperty(
        '--color-primary',
        themeConfig.colorPrimary || useTheme().token.colorPrimary,
      )
      document.documentElement.style.setProperty(
        '--border-radius',
        themeConfig.borderRadius || useTheme().token.borderRadius + 'px',
      )
    }
  }

  initCssProperty()

  return (
    <ConfigProvider locale={zhCN} theme={useTheme()}>
      <Body menuList={menuList} onEditTheme={onEditTheme}>
        <AdminRouterView />
      </Body>
    </ConfigProvider>
  )
}

export default Admin
