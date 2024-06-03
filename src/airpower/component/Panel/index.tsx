import './index.scss'
import { useState } from 'react'
import { DesktopOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react';
import { ReactNode } from 'react'
import { AppConfig } from '@/config/AppConfig';
import { useMatch } from 'react-router-dom';
interface PanelPropTypes {
    title?: string
    hideFull?: boolean
    children?: ReactNode
    footerRight?: ReactNode
}

/**
 * @param title-标题
 * @param hideFull-是否隐藏全屏按钮
 */
const Panel: React.FC<PanelPropTypes> = ({ title = '面板标题', hideFull = false, ...props }) => {

    const [isFull, toggleFull] = useState(false)

    function onFullscreen() {
        toggleFull(!isFull)
    }

    console.log(AppConfig.location)
    console.log(useMatch(AppConfig.location.pathname))
    return (
        <div className={isFull ? 'panel full' : 'panel'}>
            <div className="head">
                <div className="title">
                    <DesktopOutlined className='primaryIcon' />
                    <span className='tit_text'>{title}</span>
                </div>
                {
                    !hideFull &&
                    <div className="ctrl">
                        <i className={`airpower ${isFull ? 'icon-quanping' : 'icon-pingmuquanping'}`} onClick={onFullscreen} />
                    </div>
                }
            </div>
            <div className="panel_body">
                {props.children}
            </div>
            <div className="footerRight">
                {props.footerRight}
            </div>
        </div>
    )
}

export default observer(Panel)