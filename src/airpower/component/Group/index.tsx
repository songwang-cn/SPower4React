import './index.scss'
import { useState } from 'react'

interface IGroupPropsType {
  title?: string
  columns?: number
  hideTitle?: boolean
  children?: JSX.Element | any
}

const Group: React.FC<IGroupPropsType> = ({
  title = '标题',
  hideTitle = false,
  ...props
}) => {
  const [collapse, setCollapse] = useState(false)

  return (
    <div className="air-group">
      {!hideTitle && (
        <div className="group-header">
          <div className="tit">{title}</div>
          <i
            className="hoverIcon airpower icon-xiala"
            onClick={() => setCollapse(!collapse)}
          />
        </div>
      )}
      <div
        className={`group-content columns-${props.columns || 1} ${collapse ? 'collapse' : ''}`}
      >
        {props.children}
      </div>
    </div>
  )
}

export default Group
