
import './index.scss'
import { routes } from '@/config/router'
import AMenu from '@/airpower/component/Menu'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { IRouter } from '@/airpower/interface/IRouter'
import { AppConfig } from '@/config/AppConfig'

function getRouteNameByPath(path: string) {
    let routeName = ''
    function loop(list: IRouter[]) {
        list.map(v => {
            if (v.path === path) {
                routeName = v.name
            } else if (v.children) {
                loop(v.children)
            }
        })
    }

    loop(routes)

    return routeName
}

const Body: React.FC<{ menuList: IRouter[], children?: React.ReactNode }> = ({ menuList, children }) => {

    const location = useLocation();

    const currentRoutePath = location.pathname;

    const [collapse, changeCollapse] = useState(false)

    return (
        <div className='body'>
            <div className={collapse ? 'left collapse' : 'left'}>
                <div className="logo">
                    <img src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" alt="" />
                    {
                        !collapse && <span>{AppConfig.appId}</span>
                    }
                </div>
                <div className='menu'>
                    <AMenu menuList={menuList} collapse={collapse} />
                </div>
                <div className="copyright">
                    {collapse ? 'HoldHope' : 'HoldHope @ 2024'}
                </div>
            </div>
            <div className="right">
                <div className="header">
                    <div className="bread">
                        <div className={`expand airpower icon-caidanshouqi ${collapse && 'collapse'}`} onClick={() => changeCollapse(!collapse)} />
                        <div className='routeName'>{getRouteNameByPath(currentRoutePath)}</div>
                    </div>
                </div>
                <div className="content">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Body

