import './index.scss'
import { useState } from 'react'
import { DesktopOutlined } from '@ant-design/icons'
import { AppStore } from '@/store'
import { observer } from 'mobx-react';

interface PanelPropTypes {
    title?: string
    hideFull?: boolean
    children?: React.ReactNode
}

/**
 * 
 * @param title-标题
 * @param hideFull-是否隐藏全屏按钮
 */

const Panel: React.FC<PanelPropTypes> = ({ title = '面板标题', hideFull = false, ...props }) => {

    const [isFull, toggleFull] = useState(false)

    function onFullscreen() {
        toggleFull(!isFull)
    }

    return (
        <div className={isFull ? 'panel full' : 'panel'}>
            <div className="head">
                <div className="title">
                    <DesktopOutlined className='primaryIcon' />
                    <span className='tit_text'>{title}</span>
                    {AppStore.accessToken}
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
        </div>
    )
}

export default observer(Panel)