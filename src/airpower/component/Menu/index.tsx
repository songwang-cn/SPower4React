import * as ANTD from 'antd'
import { IRouter } from '@/airpower/interface/IRouter'
import { useNavigate } from 'react-router-dom'

const Menu: React.FC<{ menuList: IRouter[], collapse?: boolean }> = ({ menuList, collapse = false }) => {
    const navigator = useNavigate()

    function handleClick(e: any) {
        console.log('click ', e)
        navigator(e.key)
    }

    return (
        <ANTD.Menu
            mode='inline'
            theme='dark'
            onClick={handleClick}
            defaultSelectedKeys={['/']}
            defaultOpenKeys={['/']}
            inlineCollapsed={collapse}
        >
            <MenuItem menulist={menuList} />
        </ANTD.Menu>
    )
}

const MenuItem: React.FC<{ menulist: IRouter[] }> = ({ menulist }) => {
    return (
        menulist.map(route => route.children && route.children.length ?
            <ANTD.Menu.SubMenu
                eventKey={route.name}
                title={route.name}
                icon={<i className={'airpower ' + route.icon} />}
            >
                <MenuItem menulist={route.children} />
            </ANTD.Menu.SubMenu> :
            <ANTD.Menu.Item
                eventKey={route.path}
                icon={<i className={'airpower ' + route.icon} />}
            >
                {route.name}
            </ANTD.Menu.Item>)
    )
}


export default Menu