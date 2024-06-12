import './index.scss'
import { DownOutlined } from '@ant-design/icons'
import { useState } from 'react'

interface IGroupPropsType {
    title?: string
    columns?: number
    children?: JSX.Element | any
}

const Group: React.FC<IGroupPropsType> = ({ title = '标题', ...props }) => {

    const [collapse, setCollapse] = useState(false)

    return (
        <div className="air-group">
            <div className="group-header">
                <div className='tit'>{title}</div>
                <DownOutlined className='hoverIcon' onClick={() => setCollapse(!collapse)} />
            </div>
            <div className={`group-content columns-${props.columns || 1} ${collapse ? 'collapse' : ''}`}>
                {props.children}
            </div>
        </div>
    )
}

export default Group