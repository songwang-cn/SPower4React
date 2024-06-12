import './index.scss'

interface IGroupPropsType {
    title?: string
    columns?: number
    children?: JSX.Element | any
}

const Group: React.FC<IGroupPropsType> = ({ title = '标题', ...props }) => {

    return (
        <div className="air-group">
            <div className="group-title">{title}</div>
            <div className={`group-content columns-${props.columns || 1}`}>
                {props.children}
            </div>
        </div>
    )
}

export default Group