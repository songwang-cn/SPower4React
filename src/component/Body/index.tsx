import './index.scss'
import { routes } from '@/config/router'
import { AMenu } from '@/airpower/component'
import { useState } from 'react'
import { IRouter } from '@/airpower/interface/IRouter'
import { AppConfig } from '@/config/AppConfig'
import { AppStore } from '@/store'

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

const Body: React.FC<{
  menuList: IRouter[]
  children?: React.ReactNode
  onEditTheme: () => void
}> = ({ menuList, children, onEditTheme }) => {
  const currentRoutePath = AppConfig.location.pathname

  const [collapse, changeCollapse] = useState(false)

  return (
    <div className="body">
      <div className={collapse ? 'left collapse' : 'left'}>
        <div className="logo">
          <img
            src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg"
            alt=""
          />
          {!collapse && <span>{AppConfig.appName}</span>}
        </div>
        <div className="menu">
          <AMenu menuList={menuList} collapse={collapse} />
        </div>
        <div className="copyright">
          {collapse ? 'HoldHope' : 'HoldHope @ 2024'}
        </div>
      </div>
      <div className="right">
        <div className="header">
          <div className="bread">
            <div
              className={`expand airpower icon-caidanshouqi ${collapse && 'collapse'}`}
              onClick={() => changeCollapse(!collapse)}
            />
            <div className="routeName">
              {getRouteNameByPath(currentRoutePath) || currentRoutePath}
            </div>
          </div>
          <div className="center"></div>
          <div className="setting">
            <i
              className="hoverIcon airpower icon-shezhi"
              onClick={onEditTheme}
            />
          </div>
          <div className="user">{AppStore.user?.userName.slice(0, 1)}</div>
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  )
}

export default Body
