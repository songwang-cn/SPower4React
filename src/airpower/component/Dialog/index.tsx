import './index.scss'
import { SyntheticEvent, useState, useEffect, useRef } from 'react'
import { Button } from 'antd'

interface DialogPropTypes {
    title?: string
    hideFull?: boolean
    width?: string | number
    height?: string | number
    footer?: React.ReactNode,
    children?: React.ReactNode
    closeOnClickBack?: boolean
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

    function onMouseMove(e: SyntheticEvent) {
        if (isDragging) {
            const mouseNativeEvent = e.nativeEvent as MouseEvent
            setLeft(mouseNativeEvent.clientX - startX)
            setTop(mouseNativeEvent.clientY - startY)
        }
    }

    const [isShaking, setShaking] = useState(false)

    function onWrapperClick() {
        if (closeOnClickBack) {
            onCancel()
        } else {
            setShaking(true)
            setTimeout(() => {
                setShaking(false)
            }, 300)
        }
    }

    function getHeightNumber(value: string | number) {
        if (typeof value === 'number') {
            return value / 2
        } else if (value.includes('px')) {
            return parseInt(value.split('px')[0])
        } else if (value.includes('%')) {
            return window.innerHeight * parseInt(value.split('%')[0]) / 100
        }
        return 0
    }

    function getWidthNumber(value: string | number) {
        if (typeof value === 'number') {
            return value / 2
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
                style={{
                    width,
                    height,
                    top,
                    left
                }}
            >

                <div
                    className="header"
                    onMouseDown={onMouseDown}
                    style={{
                        cursor: isDragging ? 'grabbing' : 'grab'
                    }}
                >
                    <div className="title">{title}</div>
                    <div className="ctrls">
                        <i className='ctrl airpower icon-pingmuquanping' onClick={onFullscreen} />
                        <i className='ctrl airpower icon-guanbi' onClick={onCancel} />
                    </div>
                </div>
                <div className="dialog_body">

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