import { ABody } from '@/airpower/component/index'
import { RouterHelper } from '@/airpower/helper/RouterHelper'
import { IRouter } from '@/airpower/interface/IRouter'
import { useRoutes } from 'react-router-dom'

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

export default function Admin() {



  return (
    <ABody menuList={menuList}>
      <AdminRouterView />
    </ABody>
  )
}

