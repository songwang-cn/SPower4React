
import { IRouter } from '@/airpower/interface/IRouter'
import Login from '@/airpower/Login'
import Admin from '@/component/Admin'

export const routes: Array<IRouter> = [
    {
        name: '登录',
        path: '/login',
        element: <Login />
    },
    {
        name: 'admin',
        path: '/*', // 添加 * 号才会向下匹配子路由
        icon: 'icon-xiangqing',
        element: <Admin />,
        children: []
    }
]



