import './index.scss'
import { SyntheticEvent, useState } from 'react'
import { Button } from 'antd'

interface DialogPropTypes {
    title?: string
    hideFull?: boolean
    width?: string | number
    height?: string | number
    footer?: React.ReactNode,
    children?: React.ReactNode
    closeOnClickBack?: boolean
    param?: any,
    onConfirm: () => void,
    onCancel: () => void,
}

/**
 * 
 * @param title-标题
 * @param hideFull-是否隐藏全屏按钮
 */

const Dialog: React.FC<DialogPropTypes> = ({
    title = '弹窗标题',
    hideFull = false,
    width = '60%',
    height = '60%',
    closeOnClickBack = false,
    onConfirm,
    onCancel,
    ...props
}) => {

    const [isFullScreen, toggleFull] = useState(false)

    function onFullscreen() {
        toggleFull(!isFullScreen)
    }

    const [isDragging, toggleDragging] = useState(false)

    const [startX, setStartX] = useState(0)
    const [startY, setStartY] = useState(0)

    function onMouseDown(e: SyntheticEvent) {
        const mouseNativeEvent = e.nativeEvent as MouseEvent
        setStartX(mouseNativeEvent.offsetX)
        setStartY(mouseNativeEvent.offsetY)
        toggleDragging(true)
    }

    /**
     * 吸顶阈值
     */
    const thresholdDistance = 20

    function onMouseMove(e: SyntheticEvent) {
        if (isDragging) {
            const mouseNativeEvent = e.nativeEvent as MouseEvent
            if (mouseNativeEvent.clientX - startX <= thresholdDistance) {
                setLeft(0)
            } else if (mouseNativeEvent.clientX - startX >= window.innerWidth - getWidthNumber(width) - thresholdDistance) {
                setLeft(window.innerWidth - getWidthNumber(width))
            } else {
                setLeft(mouseNativeEvent.clientX - startX)
            }

            if (mouseNativeEvent.clientY - startY <= thresholdDistance) {
                setTop(0)
            } else if (mouseNativeEvent.clientY - startY >= window.innerHeight - getHeightNumber(height) - thresholdDistance) {
                setTop(window.innerHeight - getHeightNumber(height))
            } else {
                setTop(mouseNativeEvent.clientY - startY)
            }
        }
    }


    function onWrapperClick() {
        if (closeOnClickBack) {
            onCancel()
        }
    }

    function getHeightNumber(value: string | number) {
        if (typeof value === 'number') {
            return value
        } else if (value.includes('px')) {
            return parseInt(value.split('px')[0])
        } else if (value.includes('%')) {
            return window.innerHeight * parseInt(value.split('%')[0]) / 100
        }
        return 0
    }

    function getWidthNumber(value: string | number) {
        if (typeof value === 'number') {
            return value
        } else if (value.includes('px')) {
            return parseInt(value.split('px')[0])
        } else if (value.includes('%')) {
            return window.innerWidth * parseInt(value.split('%')[0]) / 100
        }
        return 0
    }


    /**
     * 弹窗位置 top left
     */
    const [top, setTop] = useState(window.innerHeight / 2 - getHeightNumber(height) / 2)

    const [left, setLeft] = useState(window.innerWidth / 2 - getWidthNumber(width) / 2)

    window.onresize = () => {
        setTop(window.innerHeight / 2 - getHeightNumber(height) / 2)
        setLeft(window.innerWidth / 2 - getWidthNumber(width) / 2)
    }


    return (
        <div className="wrapper"
            onMouseMove={onMouseMove}
            onMouseUp={() => toggleDragging(false)}
            onClick={onWrapperClick}
        >
            <div
                className={isFullScreen ? "dialog full" : "dialog"}
                style={{ width, height, top, left, transition: isDragging ? 'none' : 'all .3s' }}
            >
                <div
                    className="header"
                    onMouseDown={onMouseDown}
                    onDoubleClick={onFullscreen}
                    style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
                >
                    <div className="title">{title}</div>
                    <div className="ctrls">
                        <i
                            className={`ctrl airpower ${isFullScreen ? 'icon-quanping' : 'icon-pingmuquanping'}`}
                            onClick={onFullscreen} onMouseDown={(e) => e.stopPropagation()}
                        />
                        <i
                            className='ctrl airpower icon-guanbi'
                            onClick={onCancel} onMouseDown={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
                <div className="dialog_body">
                    {props.children}
                </div>
                <div className="footer">
                    {
                        props.footer ? props.footer :
                            <>
                                <Button type='primary' onClick={onConfirm}>确定</Button>
                                <Button onClick={onCancel}>取消</Button>
                            </>
                    }
                </div>
            </div>
        </div >
    )
}

export default Dialog