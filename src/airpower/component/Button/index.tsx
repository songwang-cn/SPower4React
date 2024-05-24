import * as ANTD from 'antd'
import {
    FormOutlined,
    PlusCircleOutlined,
    DeleteOutlined,
    InfoCircleOutlined
} from '@ant-design/icons'

interface ButtonPropTypes extends ANTD.ButtonProps {
    iconType?: 'EDIT' | 'ADD' | 'DELETE' | 'DETAIL'
    iconButton?: boolean
    tooltip?: string
    children?: any
}

/**
 * @props iconType antd原生的 icon 属性会覆盖这个 iconType
 * @description iconType 目前支持 'EDIT' | 'ADD' | 'DELETE' | 'DETAIL' 
 * @props iconButton 是否是图标按钮
 * @props tooltip 提示语
 */
const Button: React.FC<ButtonPropTypes> = ({ ...props }) => {

    function getIconByIconType() {
        switch (props.iconType) {
            case 'EDIT':
                return <FormOutlined />
            case 'ADD':
                return <PlusCircleOutlined />
            case 'DELETE':
                return <DeleteOutlined />
            case 'DETAIL':
                return <InfoCircleOutlined />
            default:
                return null
        }
    }

    return (
        <ANTD.Tooltip title={props.tooltip}>
            <ANTD.Button
                icon={props.icon || getIconByIconType()}
                type={props.iconButton ? 'text' : props.type}
                {...props}
            >
                {!props.iconButton ? props.children : ''}
            </ANTD.Button>
        </ANTD.Tooltip>
    )
}

export default Button