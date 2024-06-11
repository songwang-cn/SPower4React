import Body from './Body'
import { RouterHelper } from '@/airpower/helper/RouterHelper'
import { IRouter } from '@/airpower/interface/IRouter'
import { AppConfig } from '@/config/AppConfig'
import { useRoutes, useNavigate, useLocation } from 'react-router-dom'


const menuList: IRouter[] = [
  {
    name: '首页',
    path: '/',
    icon: 'icon-xiangqing',
    component: '/home/index'
  },
  {
    name: '组件',
    icon: 'icon-xiangqing',
    children: [
      {
        name: '列表（设备）',
        path: '/list',
        icon: 'icon-xiangqing',
        component: '/device/list'
      }
    ]
  }
]

function AdminRouterView() {
  return useRoutes(RouterHelper.initRoute(menuList))
}


const Admin = () => {

  /**
   * 将 react 路由跳转钩子方法 useNavigate() 赋值给全局配置 AppConfig.navigate
   */
  AppConfig.navigate = useNavigate()

  AppConfig.location = useLocation()

  return (
    <Body menuList={menuList}>
      <AdminRouterView />
    </Body>
  )
}

export default Admin

