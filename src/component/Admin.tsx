import { ABody } from '@/airpower/component/index'
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
    name: '设备管理',
    icon: 'icon-xiangqing',
    children: [
      {
        name: '列表',
        path: '/list',
        icon: 'icon-xiangqing',
        component: '/device/list'
      }
    ]
  },
  {
    name: '组件示例',
    path: '/componentParty',
    icon: 'icon-xiangqing',
    component: '/componentParty/index'
  },
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
    <ABody menuList={menuList}>
      <AdminRouterView />
    </ABody>
  )
}

export default Admin

